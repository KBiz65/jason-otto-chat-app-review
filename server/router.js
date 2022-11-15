const express = require("express");
const router = express.Router();
const { client } = require("./modules/db");

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
    console.log(err);
    res.statusCode = 500;
    res.json({ message: "500 | Internal Server Error" });
  }
});

// POST new message
router.post("/messages", (req, res) => {
  res.statusCode = 201;
  res.json({ message: "create new message" });

  // todo: build the query
  const query = {
    name: "new-message",
    text: "INSERT INTO messages ",
  };

  // todo: run the query
  // todo: handle the response?
});

// GET all users
router.get("/users", (req, res) => {
  // todo: build the query
  // todo: run the query
  // todo: return the results as json
});

// GET user by ???
router.get("/users/:id", (req, res) => {
  // todo: build the query with the given id
  // todo: run the query
  // todo: return the user
});

module.exports = router;
