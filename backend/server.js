const express = require("express");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
	res.send("API is up and running!");
});


app.listen(PORT, () => {
	console.log("Server Started on Port: ", PORT);
});
