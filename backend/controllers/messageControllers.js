const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name email pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const editMessage = asyncHandler(async (req, res) => {
  const { content, chatId, messageId, senderId } = req.body;

  if (!content || !chatId || !messageId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  try {
    let message = await Message.findOneAndUpdate(
      { _id: messageId, isEdited: false, sender: senderId },
      { content: content, isEdited: true },
      { new: true }
    );
    if (message) {
      message = await message.populate("sender", "name email pic");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });
    } else {
      res.send("Message is already updated");
      return;
    }
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    let messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email pic")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteMessage = asyncHandler(async (req, res) => {
  const { chatId, messageId, senderId } = req.body;

  if (!messageId || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  try {
    let message = await Message.findOneAndDelete({
      _id: messageId,
      chat: chatId,
      sender: senderId,
    });
    if (message) {
      return res.status(200).send("Message deleted successfully!");
    } else {
      return res.status(404).send("No such message found");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages, editMessage, deleteMessage };
