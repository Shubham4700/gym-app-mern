import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();


// ✅ REGISTER
router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: "User registered" });
});


// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, "secretkey");

  res.json({ token, user });
});

export default router;