import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// Protect routes that you can only access if you are logged in (if user has jwt cookie)
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      // create user in request body that you can reference in controllers
      // You are able to get the user from the userId we save in jwt payload
      // and we will set the user property to that user
      req.user = await User.findById(decodedToken.userId).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error(`Not authorized, invalid token: ${token}`);
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
