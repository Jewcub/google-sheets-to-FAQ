const fs = require("fs").promises;
const path = require("path");
const { projectPath } = require("../config");
const docID = "1imzQociewnWFW8dfPM_4cRDrDWdBvhYMcbQ8C6e1-7g";
const docSavePath = "/server/files/";
const parseHTML = require("../utils/parseHTML");
const {
  downloadFile,
  //   listFiles,
  getFileModified,
} = require("../googleService/googleDrive");

const localFilesTimes = async () => {
  const list = await fs.readdir(projectPath + docSavePath);
  return (
    list
      .map((name) =>
        name.startsWith("1") ? parseInt(name.split(".html")[0]) : 0
      )
      // filter out local .dstore file
      .filter((name) => name !== 0)
  );
};
const deleteExtraFiles = async (localFilesList, newFaqPath) => {
  // only keep most recent 3
  try {
    if (localFilesList.length > 3) {
      fs.unlink(
        projectPath + docSavePath + Math.min(...localFilesList) + ".json"
      );
      // recursive if needed
      deleteExtraFiles(await localFilesTimes());
    }
    fs.unlink(newFaqPath + ".html");
  } catch (error) {
    console.log({ error });
  }
};
/** check if saved file version is most recent. if so serve that, if not download and serve new one */
const getFAQ = async (router) => {
  router.get("/get-faq", async function (req, res, next) {
    // list local files
    try {
      //   const googleAccountFiles = await listFiles();
      //   console.log({ googleAccountFiles });
      let localFiles = await localFilesTimes();
      console.log({ localFiles });
      const modified = await getFileModified(docID);
      console.log({ modified });
      const modifiedTime = new Date(modified).getTime();
      console.log({ modifiedTime });
      let mostRecentLocal = Math.max(...localFiles);
      console.log({ mostRecentLocal });
      const wasModified = modifiedTime > mostRecentLocal;
      console.log({ wasModified });

      const download = async () => {
        const now = new Date().getTime();
        const newFaqPath = projectPath + docSavePath + now;
        await downloadFile(docID, newFaqPath + ".html");
        const faqRaw = await fs.readFile(newFaqPath + ".html", "utf-8");
        const formatted = parseHTML(faqRaw);
        await fs.writeFile(
          path.join(newFaqPath + ".json"),
          JSON.stringify(formatted)
        );
        // delete html
        localFiles = await localFilesTimes();
        mostRecentLocal = Math.max(...localFiles);
        deleteExtraFiles(localFiles, newFaqPath);
      };
      if (wasModified) {
        await download();
      }
      let faq;
      try {
        faq = await fs.readFile(
          projectPath + docSavePath + mostRecentLocal + ".json",
          "utf-8"
        );
      } catch (error) {
        await download();
      }
      try {
        faq = await fs.readFile(
          projectPath + docSavePath + mostRecentLocal + ".json",
          "utf-8"
        );
      } catch (error) {
        console.log({ error });
      }
      res.json({ faq });
    } catch (error) {
      console.log({ error });
    }
  });
};

module.exports = getFAQ;
