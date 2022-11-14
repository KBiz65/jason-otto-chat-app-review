const path = require("path");
const morgan = require("morgan");
const express = require("express");
const app = express();
const router = require("./router");
const { protect } = require("./modules/auth");
const { validateFormData, validateLoginData } = require("./modules/util");
const { createNewUser, signIn } = require("./handlers/users");

app.use(morgan("dev")); // logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.get("/", express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.json({ message: "hello from Chat App" });
});

app.use("/api", protect, router);
app.post("/users", validateFormData, createNewUser);
app.post("/signin", validateLoginData, signIn);

module.exports = app;
