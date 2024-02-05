const express = require("express");
require("dotenv").config();
const { chats } = require("./data/data");
const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
	res.send("API is up and running!");
});

app.get("/api/chat", (req, res) => {
	res.send(chats);
});

app.get("/api/chat/:id", () => {
	const id = req.params.id;
	const singleChat = chats.find((c) => c._id === req.params.id);
	res.send(singleChat);
});
app.listen(PORT, () => {
	console.log("Server Started on Port: ", PORT);
});
