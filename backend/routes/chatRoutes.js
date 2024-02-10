const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  accessChats,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chatControllers");

const router = express.Router();

router.post("/", protect, accessChats);

router.get("/", protect, fetchChats);

router.post("/group", protect, createGroupChat);

router.put("/rename", protect, renameGroup);

router.put("/groupremove", protect, removeFromGroup);

router.put("/groupadd", protect, addToGroup);

module.exports = router;
