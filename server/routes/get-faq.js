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

const localFilesOrder = async () => {
  const list = await fs.readdir(projectPath + docSavePath);
  return list
    .map((name) =>
      name.startsWith("1") ? parseInt(name.split(".html")[0]) : 0
    )
    .filter((name) => name !== 0);
};

/** check if saved file version is most recent. if so serve that, if not download and serve new one */
const getFAQ = async (router) => {
  router.get("/get-faq", async function (req, res, next) {
    // list local files
    try {
      //   const googleAccountFiles = await listFiles();
      //   console.log({ googleAccountFiles });
      let localFiles = await localFilesOrder();
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
        const filePath = path.join(projectPath, docSavePath + now + ".html");
        await downloadFile(docID, filePath);

        localFiles = await localFilesOrder();
        // only keep most recent 3
        // if (localFiles.length >= 3)
        //   fs.unlink(
        //     projectPath + docSavePath + Math.min(...localFiles) + ".json"
        //   );
        mostRecentLocal = Math.max(...localFiles);
        const faqRaw = await fs.readFile(
          projectPath + docSavePath + mostRecentLocal + ".html",
          "utf-8"
        );
        const formatted = parseHTML(faqRaw);
        console.log({ formatted });
        await fs.writeFile(
          path.join(projectPath, docSavePath + mostRecentLocal + ".json"),
          JSON.stringify(formatted)
        );
        // fs.unlink(projectPath + docSavePath + mostRecentLocal + ".html");
      };
      if (wasModified) {
        download();
      }
      let faq;
      try {
        faq = await fs.readFile(
          projectPath + docSavePath + mostRecentLocal + ".json",
          "utf-8"
        );
      } catch (error) {
        await download();
        faq = await fs.readFile(
          projectPath + docSavePath + mostRecentLocal + ".json",
          "utf-8"
        );
      }

      // console.log({ faq });
      res.json({ faq });
    } catch (error) {
      console.log({ error });
    }
  });
};

module.exports = getFAQ;
