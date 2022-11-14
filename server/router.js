const express = require("express");
const router = express.Router();

// GET all messages
router.get("/messages", (req, res) => {
  res.statusCode = 200;
  res.json({ message: "get all messages" });
});

// POST new message
router.post("/messages", (req, res) => {
  res.statusCode = 201;
  res.json({ message: "create new message" });
});

// GET all users
router.get("/users", (req, res) => {});

// GET user by ???
router.get("/users/:id", (req, res) => {});

module.exports = router;
