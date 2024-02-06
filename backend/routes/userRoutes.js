const express = require("express");
const { registerUser } = require("../controllers/userControllers");

const router = express.Router();

router.post("/", registerUser);

// router.post("/login").post(registerUser);

module.exports = router;
