import express from "express";
import { protect } from "../middleware/authMiddleware.js"
import {
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.get("/login", async(req,res) => res.send("Sign in page"))
router.post("/logout", logoutUser);
router.route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;
