const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("root cds endpoint hit");
  res.status(200).send("the root cds endpoint");
});

module.exports = router;
