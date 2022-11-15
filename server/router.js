const express = require("express");
const router = express.Router();
const { protect } = require("./modules/auth");
const {
  validateMessage,
  validateId,
  validateFormData,
} = require("./modules/validate");
const { getAllMessages, createNewMessage } = require("./handlers/messages");
const { getUserById, createNewUser } = require("./handlers/users");

router.get("/users/:user_id", validateId, getUserById);
router.post("/users", validateFormData, createNewUser);

router.get("/messages", getAllMessages);
router.post("/messages", [validateMessage, protect], createNewMessage);

module.exports = router;
