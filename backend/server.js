const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const app = express();

connectDB();
//! Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandler);

//! LISTEN
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server Started on Port: ", PORT);
});
