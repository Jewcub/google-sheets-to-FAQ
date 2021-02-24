const cheerio = require("cheerio");

const parseHTML = (html) => {
  const $ = cheerio.load(html);
  // console.log({ body: $("body").html() });

  const output = { sections: [] };
  // Jquery cannot use arrow function is we want 'this' to be correct
  $("[class*=cowc-0]").each(function (i, el) {
    const section = $(this);
    const sectionChildren = section.nextUntil("[class*=cowc-0]");
    // console.log("found children: ", sectionChildren.toArray().length);
    const sectionOutput = { name: section.find("span").text(), QAndAs: [] };

    const Qs = sectionChildren.filter("[class*=cowc-1]");
    Qs.each(function () {
      const Q = $(this);
      const QOutput = { question: Q.find("span").text(), answers: [] };
      const As = Q.nextUntil("[class*=cowc-1]");
      As.each(function () {
        const A = $(this);
        const answer = $("<div></div>");
        if (A.hasClass("lst-kix_o479q88lcowc-2")) {
          answer.append("<p>" + A.find("li").html() + "</p>");
          const subs = A.nextUntil("[class*=cowc-2]");
          if (subs.length > 0) {
            const list = $("<ul></ul>");
            list.append(subs.html());
            answer.append(list);
          }
        }
        // replace google stylings into classes
        answer.find(`[style*="font-weight:700"]`).addClass("g-bold");
        answer.find(`[style*="font-style:italic"]`).addClass("g-italic");
        answer
          .find(`[style*="text-decoration:underline"]`)
          .addClass("g-underline");

        answer.find("*").removeAttr("style"); // remove all styles
        // console.log({ answerHtml: answer.html() });
        QOutput.answers.push(answer.html());
      });
      sectionOutput.QAndAs.push(QOutput);
    });
    output.sections.push(sectionOutput);
  });

  return output;
  // console.log({ output: JSON.stringify(output) });
};

module.exports = parseHTML;
