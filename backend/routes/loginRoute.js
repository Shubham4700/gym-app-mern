const express = require("express");
const router = express.Router();
const Membership = require("../models/membership");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ 1. Check empty fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "❌ Email & Password required"
      });
    }

    // ✅ 2. Find user
    const user = await Membership.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "❌ User not found"
      });
    }

    // ✅ 3. Check password exists
    if (!user.password) {
      return res.status(500).json({
        success: false,
        message: "❌ Password missing in DB"
      });
    }

    // ✅ 4. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "❌ Wrong password"
      });
    }

    // ✅ 5. Create JWT Token (IMPORTANT 🔥)
    const token = jwt.sign(
      { id: user._id },
      "secret123", // 👉 later .env me daalna
      { expiresIn: "7d" }
    );

    // ✅ 6. Send response
    res.json({
      success: true,
      message: "✅ Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        plan: user.plan
      }
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "❌ Server error"
    });
  }
});

module.exports = router;