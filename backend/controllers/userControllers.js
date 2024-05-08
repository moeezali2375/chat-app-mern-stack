const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields!");
  }
  const UserExists = await User.findOne({ email: email });
  if (UserExists) {
    res.status(400);
    throw new Error("User already exists!");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password!");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
          //HELP search for pattern like name or email just as in SQL
        ],
      }
    : {}; // else return an empty object;
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  //HELP find users but not him/her, self
  res.send(users);
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPass, newPass } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new Error("Change your own password bruh!");
    }
    if (await user.matchPassword(oldPass)) {
      user.password = newPass;
      await user.save(); // Trigger the pre('save') hook
    } else {
      throw new Error("Your old password does not match");
    }
    res.status(200).send("Password changed successfully!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const checkEmail = asyncHandler(async (req, res) => {
  const email = req.query.email;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error("Email already registered!");
    } else {
      res.status(200).send("Unique Email!");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const changeEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    await User.findByIdAndUpdate(req.user._id, { email: email }, { new: true });
    res.status(200).send("Email Changed Successfully!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = {
  registerUser,
  authUser,
  allUsers,
  changePassword,
  checkEmail,
  changeEmail,
};
