const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { addReview } = require("../controllers/reviewControllers");
const router = express.Router();

router.post("/", protect, addReview);

module.exports = router;
