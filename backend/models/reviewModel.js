const mongoose = require("mongoose");

const reviewModel = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
  },
  review:{
    type:String
  }
});

const Review=mongoose.model("Review",reviewModel);
module.exports=Review;