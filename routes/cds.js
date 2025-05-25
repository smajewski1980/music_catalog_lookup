const express = require("express");
const router = express.Router();
const pool = require("../db_connect");
const query = require("../middleware/query");

// router.get("/", (req, res, next) => {
//   pool.query(
//     "select * from cds order by id desc limit 25",
//     [],
//     (err, result) => {
//       res.status(200).send(result.rows);
//     }
//   );
// });

router.post("/total", (req, res, next) => {
  const { searchField, searchTerm } = req.body;
  pool.query(
    `select count(*) from cds where ${searchField} like $1`,
    [`%${searchTerm}%`],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("problem with something");
      }
      console.log(result.rows[0]);
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
      "select * from cds where artist like $1 order by artist, title LIMIT $2 OFFSET ($3 - 1) * $2",
      [`%${searchTerm}%`, offset, page],
      (err, result) => {
        return res.status(200).send(result.rows);
      }
    );
  } else if (searchField.toLowerCase() === "title") {
    pool.query(
      "select * from cds where title like $1 order by title, artist LIMIT $2 OFFSET ($3 - 1) * $2",
      [`%${searchTerm}%`, offset, page],
      (err, result) => {
        return res.status(200).send(result.rows);
      }
    );
  } else if (searchField.toLowerCase() === "location") {
    pool.query(
      "select * from cds where location like $1 order by location, artist, title LIMIT $2 OFFSET ($3 - 1) * $2",
      [`%${searchTerm}%`, offset, page],
      (err, result) => {
        return res.status(200).send(result.rows);
      }
    );
  }
});

module.exports = router;
