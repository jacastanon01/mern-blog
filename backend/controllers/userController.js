import asyncHandler from "express-async-handler"; // allows you to use async-await while handling the try catches to throw unique errors
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs"

// 

// @desc   Authenticater user and set token
// @route   POST api/users/auth
// @access  public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //console.log(email, password, user)
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

// @desc  Register new user
// @route   POST api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //console.log(name, email, password)

  const userCheck = await User.findOne({ email });

  if (userCheck) {
    res.status(400);
    throw new Error("User already exists");
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: encryptedPassword,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(200).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(400);
    throw new Error("Could not create user");
  }
});

// @desc  Logout user and clear cookies/jwt
// @route   POST api/users/logout
// @access  public
const logoutUser = asyncHandler(async (req, res) => {
  // clear jwt cookie that we set in generateToken
  res.cookie("jwt", "", {
    httpOnly: true,
    // expires right away
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc  Get user profile
// @route   GET api/users/profile
// @access  private
const getUserProfile = asyncHandler(async (req, res) => {
    // TODO Connect user to blogs they've written
  // if user exists in request object user is authorized
  if (req.user){

    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
});

// @desc  Update user profile
// @route   PUT api/users/profile
// @access  private
const updateUserProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id)

  if (user){
    // We want to check if the property is part of the request body
    // If not, maintain the current value
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.status(200).json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email})
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

const updateUserProfile1 = asyncHandler(async (req, res) => {
  const { email, name } = req.body;
  //const userId = res.user._id
  const user = await User.findById(req.user._id)
  if (user) {
    await User.findByIdAndUpdate(req.user._id, {email, name})
  }
  console.log(req.user._id)
  res.status(201).json({ name, email });
});

// TODO create private users/profile route where other users can view their profile and blog
// @desc get one user's blogs
// 
// @access private
// const getPostsByUser = asyncHandler(async (req, res) => {
//   ? pass in a userId instead of user property
// const userBlogs = await Blog.find({ author: req.user._id });
// console.log(userBlogs)
// res.status(200).json({ userBlogs });
// });

export {
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
};
