const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.json({ message: "Hello from the Chat App API!" });
});

module.exports = app;
