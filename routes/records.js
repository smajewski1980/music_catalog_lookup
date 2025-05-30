const express = require("express");
const router = express.Router();
const pool = require("../db_connect");
const query = require("../middleware/query");

router.post("/total", (req, res, next) => {
  const { searchField, searchTerm } = req.body;
  pool.query(
    `select count(*) from records where ${searchField} like $1`,
    [`%${searchTerm}%`],
    (err, result) => {
      if (err) {
        // console.log(err);
        return res.status(500).send("problem with something");
      }
      // console.log(result.rows[0]);
      return res.json(result.rows[0]);
    }
  );
});

router.post("/", query, (req, res, next) => {
  const page = req.page;
  const offset = req.offset;
  const { searchField, searchTerm } = req.body;
  let orderBy;

  orderBy =
    searchField.toLowerCase() === "artist"
      ? (orderBy = "artist, title")
      : searchField.toLowerCase() === "title"
      ? (orderBy = "title, artist")
      : (orderBy = "location, artist, title");

  pool.query(
    `select * from records where ${searchField} like $1 order by ${orderBy} LIMIT $2 OFFSET ($3 - 1) * $2`,
    [`%${searchTerm}%`, offset, page],
    (err, result) => {
      return res.status(200).send(result.rows);
    }
  );
});

module.exports = router;
