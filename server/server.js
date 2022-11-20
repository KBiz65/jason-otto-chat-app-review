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
app.use(
  cors({
    origin: true,
    // allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "../client/build")));
}
app.get("/", (_, res) => {
  res.statusCode = 200;
  res.json({ message: "hello from the server" });
});
app.use("/api", router);
app.post("/signin", validateLoginData, signIn);
app.get("/signout", signOut);

module.exports.server = createServer(app);
