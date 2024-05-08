const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  accessChats,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
  exportChat,
} = require("../controllers/chatControllers");

const router = express.Router();

router.post("/", protect, accessChats);

router.get("/", protect, fetchChats);

router.post("/group", protect, createGroupChat);

router.put("/rename", protect, renameGroup);

router.put("/groupadd", protect, addToGroup);

router.put("/groupremove", protect, removeFromGroup);

router.get("/export/:chatId", protect, exportChat);

module.exports = router;
