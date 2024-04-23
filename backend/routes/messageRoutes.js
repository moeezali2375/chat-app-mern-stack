const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  sendMessage,
  allMessages,
  editMessage,
  deleteMessage,
} = require("../controllers/messageControllers");

const router = express.Router();

router.post("/", protect, sendMessage);

router.get("/:chatId", protect, allMessages);

router.post("/edit", protect, editMessage);

router.delete("/", protect, deleteMessage);

module.exports = router;
