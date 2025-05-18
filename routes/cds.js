const express = require("express");
const router = express.Router();
const pool = require("../db_connect");

router.get("/", (req, res, next) => {
  pool.query(
    "select * from cds order by id desc limit 25",
    [],
    (err, result) => {
      // console.log("root cds endpoint hit");

      res.status(200).send(result.rows);
    }
  );
});

module.exports = router;
