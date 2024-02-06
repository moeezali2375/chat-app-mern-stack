const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const app = express();

connectDB();
//! Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);

//! LISTEN
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server Started on Port: ", PORT);
});
