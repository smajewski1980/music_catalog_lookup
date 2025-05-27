const express = require("express");
const router = express.Router();
const pool = require("../db_connect");
const query = require("../middleware/query");

// router.get("/", (req, res, next) => {
//   console.log("root records endpoint hit");
//   res.status(200).send("the root records endpoint");
// });

router.post("/total", (req, res, next) => {
  const { searchField, searchTerm } = req.body;
  pool.query(
    `select count(*) from records where ${searchField} like $1`,
    [`%${searchTerm}%`],
    (err, result) => {
      if (err) {
        console.log(err);
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
  console.log(searchTerm);
  if (searchField.toLowerCase() === "artist") {
    pool.query(
      "select * from records where artist like $1 order by artist, title LIMIT $2 OFFSET ($3 - 1) * $2",
      [`%${searchTerm}%`, offset, page],
      (err, result) => {
        return res.status(200).send(result.rows);
      }
    );
  } else if (searchField.toLowerCase() === "title") {
    pool.query(
      "select * from records where title like $1 order by title, artist LIMIT $2 OFFSET ($3 - 1) * $2",
      [`%${searchTerm}%`, offset, page],
      (err, result) => {
        return res.status(200).send(result.rows);
      }
    );
  } else if (searchField.toLowerCase() === "location") {
    pool.query(
      "select * from records where location like $1 order by location, artist, title LIMIT $2 OFFSET ($3 - 1) * $2",
      [`%${searchTerm}%`, offset, page],
      (err, result) => {
        return res.status(200).send(result.rows);
      }
    );
  }
});

module.exports = router;
