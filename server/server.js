const path = require("path");
require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const app = express();
const router = require("./router");

app.use(morgan("dev")); // logging

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "../client/build")));
}

app.use("/", (req, res) => {
  res.statusCode = 200;
  res.json({ message: "hello from Chat App" });
});

app.use("/api", router);

module.exports = app;
