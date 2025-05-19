const express = require("express");
const router = express.Router();
const pool = require("../db_connect");

router.get("/", (req, res, next) => {
  console.log("root tapes endpoint hit");
  res.status(200).send("the root tapes endpoint");
});

router.post("/", (req, res, next) => {
  const { searchField, searchTerm } = req.body;
  if (searchField.toLowerCase() === "artist") {
    pool.query(
      "select * from tapes where artist like $1",
      [`%${searchTerm}%`],
      (err, result) => {
        res.status(200).send(result.rows);
      }
    );
  } else if (searchField.toLowerCase() === "title") {
    pool.query(
      "select * from tapes where title like $1",
      [`%${searchTerm}%`],
      (err, result) => {
        res.status(200).send(result.rows);
      }
    );
  } else if (searchField.toLowerCase() === "location") {
    pool.query(
      "select * from tapes where location like $1",
      [`%${searchTerm}%`],
      (err, result) => {
        res.status(200).send(result.rows);
      }
    );
  }
});

module.exports = router;
