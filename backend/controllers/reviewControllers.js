const Review = require("../models/reviewModel");
const asyncHandler = require("express-async-handler");

const addReview = asyncHandler(async (req, res) => {
  const { rating, review } = req.body;
  try {
    await Review.create({
      userId: req.user._id,
      rating: rating,
      review: review,
    });
    res.status(200).send("Review Submitted!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = { addReview };
