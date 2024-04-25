const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  changePassword,
  checkEmail,
} = require("../controllers/userControllers");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", registerUser);

router.post("/login", authUser);

router.get("/", protect, allUsers);

router.put("/password", protect, changePassword);

router.get("/email", protect, checkEmail);

module.exports = router;
