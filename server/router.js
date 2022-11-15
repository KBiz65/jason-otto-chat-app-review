const express = require("express");
const router = express.Router();
const { getAllMessages, createNewMessage } = require("./handlers/messages");
const { getUserById } = require("./handlers/users");
const { validateMessage, validateId } = require("./modules/validate");

router.get("/messages", getAllMessages);
router.post("/messages", validateMessage, createNewMessage);
router.get("/users/:user_id", validateId, getUserById);

module.exports = router;
