import cheerio = require('cheerio');
const parseHTML = (html: string) => {
  const $ = cheerio.load(html);
  // replace google stylings into classes
  $('*').find(`[style*="font-weight:700"]`).addClass('g-bold');
  $('*').find(`[style*="font-style:italic"]`).addClass('g-italic');
  $('*').find(`[style*="text-decoration:underline"]`).addClass('g-underline');
  $('*').removeAttr('style'); // remove all styles
  // find all the cow-o's and replace to section class
  // consider using toArray() to avoid using $(this)

  console.log({ body: $('body').html() });
  type QAndA = { question: string; answers: string[] };
  type section = {
    name: string;
    QAndAs: QAndA[];
  };

  const output: { sections: section[] } = { sections: [] };
  // Jquery cannot use arrow function is we want 'this' to be correct
  $('[class*=cowc-0]').each(function (i, el) {
    //@ts-ignore
    const section = $(this);
    const sectionOutput: section = { name: section.find('span').text(), QAndAs: [] };

    const questions = section.nextUntil('[class*=cowc-0]');
    const QArray = questions.map(function () {
      //@ts-ignore
      $(this).html();
    });
    console.log({ QArray });
    questions.each(function () {
      //@ts-ignore

      const Q = $(this);
      const QOutput: QAndA = { question: Q.find('span').text(), answers: [] };
      const As = Q.nextUntil('[class*=cowc-1]');
      As.each(function () {
        //@ts-ignore
        const A = $(this);

        const answer = $('<div></div>');
        // if it has sub paragraphs
        if (A.attr('class')?.includes('cowc-2')) {
          answer.append('<p>' + A.find('li').html() + '</p>');
          const subs = A.nextUntil('[class*=cowc-2]');
          if (subs.length > 0) {
            const list = $('<ul></ul>');
            const subHTML = subs.html();
            if (subHTML) list.append(subHTML);
            answer.append(list);
          }
        }
        // console.log({
        //   answerHtml: answer.html(),
        //   length: JSON.stringify(answer.html().valueOf()).length,
        // });
        const answerHTML = answer.html();
        if (answerHTML && JSON.stringify(answerHTML).length > 2) QOutput.answers.push(answerHTML);
      });
      console.log({ QOutput });
      sectionOutput.QAndAs.push(QOutput);
    });
    output.sections.push(sectionOutput);
  });

  return output;
  // console.log({ output: JSON.stringify(output) });
};

export default parseHTML;
