const path = require("path");
const projectPath = path.resolve(__dirname, "../");
const dotenv = require("dotenv");
dotenv.config();

const docID = "1imzQociewnWFW8dfPM_4cRDrDWdBvhYMcbQ8C6e1-7g";

const redirectUris =
  process.env.NODE_ENV === "production"
    ? ["https://doc2faq-xkmml2qcbq-de.a.run.app/"]
    : ["http://localhost:3000", "http://localhost:3001"];
// console.log("client secret", process.env.CLIENT_SECRET);
module.exports = { projectPath, docID, redirectUris };
