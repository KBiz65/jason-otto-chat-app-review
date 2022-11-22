const path = require("path");
const { createServer } = require("http");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router");
const { validateLoginData } = require("./modules/validate");
const { signIn, signOut } = require("./handlers/users");

app.use(morgan("dev")); // logging
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use("/api", router);
app.post("/signin", validateLoginData, signIn);
app.post("/signout", signOut);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports.server = createServer(app);
