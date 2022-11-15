const path = require("path");
const morgan = require("morgan");
const express = require("express");
const app = express();
const router = require("./router");
const { validateLoginData } = require("./modules/validate");
const { signIn } = require("./handlers/users");

app.use(morgan("dev")); // logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "../client/build")));
}

app.use("/api", router);
app.post("/signin", validateLoginData, signIn);

module.exports = app;
