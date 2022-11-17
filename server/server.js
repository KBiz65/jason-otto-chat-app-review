const path = require("path");
const { createServer } = require("http");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");
const router = require("./router");
const { validateLoginData } = require("./modules/validate");
const { signIn } = require("./handlers/users");

app.use(morgan("dev")); // logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "../client/build")));
}
app.use("/api", router);
app.post("/signin", validateLoginData, signIn);

module.exports.server = createServer(app);
