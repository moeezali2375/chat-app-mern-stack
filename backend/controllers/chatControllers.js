const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const accessChats = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("User Id param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(fullChat);
    } catch (error) {
      throw new Error(error.message);
    }
  }
});
const fetchChats = asyncHandler(async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 });

    const result = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const createGroupChat = asyncHandler(async (req, res) => {});
const renameGroup = asyncHandler(async (req, res) => {});
const removeFromGroup = asyncHandler(async (req, res) => {});
const addToGroup = asyncHandler(async (req, res) => {});

module.exports = {
  accessChats,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
};
