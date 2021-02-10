const path = require("path");
const projectPath = path.resolve(__dirname, "../");
const dotenv = require("dotenv");
dotenv.config();
// console.log("client secret", process.env.CLIENT_SECRET);
module.exports = { projectPath };
