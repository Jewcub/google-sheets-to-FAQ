const getFAQs = require("./service");
const fs = require("fs");
const path = require("path");
const { srcDir } = require("../config");
const faqFolder = path.join(srcDir + "/assets/faqs");

const defaultFAQs = [
  { question: "What's up?", answer: "Not much" },
  {
    question: "What's up?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis accusantium possimus amet, animi qui ut maxime nesciunt! Perspiciatis cupiditate magnam amet molestias quo excepturi, nobis deserunt aut similique quia in",
  },
];
const getFaqRoute = async (req, res) => {
  const FAQs = await getFAQs();
  console.log({ FAQs });

  if (FAQs.error) {
    res.json(defaultFAQs);
  } else res.json(FAQs);
};

const faqsTemplate = (faqData) => {
  console.log("printing faq template: faqData:", faqData);

  let returnStr = ``;
  faqData.forEach((FAQ) => {
    returnStr += "";
  });
  console.log("printing faq returnStr", returnStr);

  return returnStr;
};

const homeRoute = async (req, res) => {
  try {
    console.log("/faq/ called");
    // const todayDate = new Date().toDateString();
    let faqData = await getFAQService.getFAQs();

    console.log({ faqData });
    if (faqData.error) {
      try {
        console.log("send default", defaultFAQs);
        const faqStr = faqsTemplate(defaultFAQs);
        const template = htmlTemplate(faqStr);
        console.log({ template });
        console.log("write location", faqFolder + `/default.html`);
        fs.writeFileSync(faqFolder + `/default.html`, template);
        return res.sendFile(faqFolder + `/default.html`);
      } catch (error) {
        console.log({ error });
      }
    }
    const files = fs.readdirSync(faqFolder).map((fileName) => {
      return path.join(folderPath, fileName);
    });
    console.log({ files });
    const version = files.length;
    console.log({ version });
    // check if old version matches this call
    const mostRecent = fs.readFileSync(files[files.length - 1]);
    const outFile = htmlTemplate(faqsTemplate(faqData));
    console.log({ outFile, mostRecent });
    if (outFile == mostRecent)
      return res.sendFile(path.join(faqFolder + `/faq-v${version}.html`));

    // save file with version
    fs.writeFileSync(
      path.join(faqFolder + `/faq-v${version + 1}.html`),
      outFile
    );

    return res.sendFile(path.join(faqFolder + `/faq-v${version + 1}.html`));
  } catch (err) {
    return res.status(500).json({ errors: err });
  }
};

module.exports = getFaqRoute;
