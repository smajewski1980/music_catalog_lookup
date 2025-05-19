const express = require("express");
const router = express.Router();
const pool = require("../db_connect");

router.get("/", (req, res, next) => {
  console.log("root records endpoint hit");
  res.status(200).send("the root records endpoint");
});

router.post("/", (req, res, next) => {
  const { searchField, searchTerm } = req.body;
  console.log(searchTerm);
  if (searchField.toLowerCase() === "artist") {
    pool.query(
      "select * from records where artist like $1",
      [`%${searchTerm}%`],
      (err, result) => {
        res.status(200).send(result.rows);
      }
    );
  } else if (searchField.toLowerCase() === "title") {
    pool.query(
      "select * from records where title like $1",
      [`%${searchTerm}%`],
      (err, result) => {
        res.status(200).send(result.rows);
      }
    );
  } else if (searchField.toLowerCase() === "location") {
    pool.query(
      "select * from records where location like $1",
      [`%${searchTerm}%`],
      (err, result) => {
        res.status(200).send(result.rows);
      }
    );
  }
});

module.exports = router;
