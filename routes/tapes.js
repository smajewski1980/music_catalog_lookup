const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("root tapes endpoint hit");
  res.status(200).send("the root tapes endpoint");
});

module.exports = router;
