const express = require("express");
const router = new express.Router();

const getFAQ = require("./get-faq");

router.get("/ping", function (req, res, next) {
  res.send("pong");
});

getFAQ(router);

module.exports = router;
