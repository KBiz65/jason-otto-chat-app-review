const express = require("express");
const router = express.Router();
const { protect } = require("./modules/auth");
const {
  validateMessage,
  validateId,
  validateFormData,
  validateQuery,
} = require("./modules/validate");
const { getAllMessages, createNewMessage } = require("./handlers/messages");
const { getUserById, createNewUser } = require("./handlers/users");

router.get("/users/:id", validateId, getUserById);
router.post("/users", validateFormData, createNewUser);

router.get("/messages", validateQuery, getAllMessages);
router.post("/messages", [protect, validateMessage], createNewMessage);

module.exports = router;
