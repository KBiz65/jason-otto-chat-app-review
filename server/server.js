require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  console.log("we are NOT in production");
});

module.exports = app;
