const express = require("express");
const app = express();
require("dotenv").config();
const cds = require("./routes/cds");
const tapes = require("./routes/tapes");
const records = require("./routes/records");

app.use(express.json());
app.use(express.static("public"));
app.use("/api/cds", cds);
app.use("/api/tapes", tapes);
app.use("/api/records", records);

const PORT = process.env.PORT || 5500;

const server = app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

module.exports = server;
