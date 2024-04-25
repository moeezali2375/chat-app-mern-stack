const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  changePassword,
} = require("../controllers/userControllers");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", registerUser);

router.post("/login", authUser);

router.get("/", protect, allUsers);

router.post("/password", protect, changePassword);

module.exports = router;
