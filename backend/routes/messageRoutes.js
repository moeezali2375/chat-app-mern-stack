const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  sendMessage,
  allMessages,
  editMessage,
  deleteMessage,
  predictMessage,
} = require("../controllers/messageControllers");

const router = express.Router();

router.post("/", protect, sendMessage);

router.get("/predict",protect,predictMessage)

router.get("/:chatId", protect, allMessages);

router.put("/edit", protect, editMessage);

router.delete("/", protect, deleteMessage);


module.exports = router;
