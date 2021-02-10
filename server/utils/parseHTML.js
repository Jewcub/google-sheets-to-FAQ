const cheerio = require("cheerio");

const parseHTML = (html) => {
  const $ = cheerio.load(html);
  //   console.log($("body").html());

  $("*").removeAttr("style"); // remove all styles
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
        QOutput.answers.push(A.html());
      });
      sectionOutput.QAndAs.push(QOutput);
    });
    output.sections.push(sectionOutput);
  });
  return output;
  // console.log({ output: JSON.stringify(output) });
};

module.exports = parseHTML;
