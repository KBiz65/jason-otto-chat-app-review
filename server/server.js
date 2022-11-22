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

// app.get("/", (_, res) => {
//   res.statusCode = 200;
//   res.json({ message: "hello from the server" });
// });
app.use("/api", router);
app.post("/signin", validateLoginData, signIn);
app.post("/signout", signOut);
if (process.env.NODE_ENV === "production") {
  app.use("/*", express.static(path.join(__dirname, "../client/build")));
}

module.exports.server = createServer(app);
