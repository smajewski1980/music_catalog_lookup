const express = require("express");
const router = express.Router();
const pool = require("../db_connect");
const query = require("../middleware/query");

router.get("/", (req, res, next) => {
  pool.query(
    "select * from cds order by id desc limit 25",
    [],
    (err, result) => {
      res.status(200).send(result.rows);
    }
  );
});

router.post("/", query, (req, res, next) => {
  console.log("xx" + req.page);
  console.log("xx" + req.offset);

  const { searchField, searchTerm } = req.body;
  console.log(searchTerm);
  if (searchField.toLowerCase() === "artist") {
    pool.query(
      "select * from cds where artist like $1",
      [`%${searchTerm}%`],
      (err, result) => {
        res.status(200).send(result.rows);
      }
    );
  } else if (searchField.toLowerCase() === "title") {
    pool.query(
      "select * from cds where title like $1",
      [`%${searchTerm}%`],
      (err, result) => {
        res.status(200).send(result.rows);
      }
    );
  } else if (searchField.toLowerCase() === "location") {
    pool.query(
      "select * from cds where location like $1",
      [`%${searchTerm}%`],
      (err, result) => {
        res.status(200).send(result.rows);
      }
    );
  }
});

module.exports = router;
