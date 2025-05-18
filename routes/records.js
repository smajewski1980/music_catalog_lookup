const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("root records endpoint hit");
  res.status(200).send("the root records endpoint");
});

module.exports = router;
