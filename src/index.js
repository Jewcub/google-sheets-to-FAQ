const express = require("express");
const axios = require("axios");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const ip = require("ip");
const controller = require("./controller");

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const PORT = process.env.PORT;
console.log({ PORT });
// const YOUR_CLIENT_SECRET = process.env.CLIENT_SECRET;
// const YOUR_CLIENT_ID = process.env.CLIENT_ID;
// const DOTWALLET_API =
//   process.env.NODE_ENV === 'production'
//     ? 'https://staging.api.ddpurse.com/v1'
//     : `https://api.ddpurse.com/v1`;

// const url = require('url');
// const ip = require('ip');
const HEROKU_URL = "https://somewhere.herokuapp.com";
const APP_URL =
  process.env.NODE_ENV === "production"
    ? HEROKU_URL
    : `http://${ip.address()}:${PORT}`;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("src"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "index.html"));
});
app.get("/get-faqs", controller);

app.listen(PORT, async () => {
  console.log(`FAQ app listening at ${APP_URL}`);
});
