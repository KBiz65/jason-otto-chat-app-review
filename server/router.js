const express = require("express");
const router = express.Router();
const { client } = require("./modules/db");
const { validateMessage, validateId } = require("./modules/util");

// GET all messages
router.get("/messages", async (req, res) => {
  const query = {
    name: "get-all-messages",
    text: "SELECT * FROM messages",
  };

  try {
    const queryRes = await client.query(query);
    res.statusCode = 200;
    res.json({ message: "200 | OK", data: queryRes.rows });
  } catch (err) {
    res.statusCode = 500;
    res.json({ message: "500 | Internal Server Error" });
  }
});

// POST new message
router.post("/messages", validateMessage, async (req, res) => {
  const { author_id, text_content } = req.body;
  const timestamp = new Date();
  const query = {
    name: "new-message",
    text: "INSERT INTO messages (author_id, text_content, created_on) VALUES ($1, $2, $3)",
    values: [author_id, text_content, timestamp],
  };

  try {
    await client.query(query);
    res.statusCode = 201;
    res.json({ message: "201 | Created" });
  } catch (err) {
    res.statusCode = 500;
    res.json({ message: "500 | Internal Server Error" });
  }
});

// GET user by ID
router.get("/users/:user_id", validateId, async (req, res) => {
  const { user_id } = req.params;

  const query = {
    name: "get-user-by-id",
    text: "SELECT * FROM users WHERE user_id=$1",
    values: [user_id],
  };

  try {
    const queryRes = await client.query(query);
    res.statusCode = 200;
    res.json({ message: "200 | OK", data: queryRes.rows });
  } catch (err) {
    res.statusCode = 500;
    res.json({ message: "500 | Internal Server Error" });
  }
});

module.exports = router;
