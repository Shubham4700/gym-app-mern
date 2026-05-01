const crypto = require("crypto");
const express = require("express");
const razorpay = require("../config/razorpay");
const Membership = require("../models/membership");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const router = express.Router();


// ================= PRICE CALCULATION =================
const calculatePrice = (plan, trainer) => {
  let basePrice = 0;
  let months = 1;

  if (plan === "Monthly") {
    basePrice = 1000;
    months = 1;
  } else if (plan === "Quarterly") {
    basePrice = 2500;
    months = 3;
  } else if (plan === "Half Yearly") {
    basePrice = 5000;
    months = 6;
  } else if (plan === "Yearly") {
    basePrice = 9000;
    months = 12;
  } else {
    throw new Error("Invalid plan");
  }

  let trainerFee = 0;

  if (trainer === "yes") {
    trainerFee = 1000 * months; // per month
  }

  return basePrice + trainerFee;
};


// ================= VALIDATION =================
const validateUser = ({ name, email, phone, age, plan, batch, trainer }) => {
  
  if (!name || !email || !phone || !age || !plan || !batch || !trainer) {
    return "All fields are required";
  }

  if (!/^[A-Za-z](3-20)$/.test(name.trim())) {
    return "Name must be 3-20 characters and contain only letters"
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email";
  }

  if (!/^[6-9]\d}{9}$/.test(phone)) {
    return "Invalid phone(must be 10 digits & start with 6-9";
  }

  if (age < 14 || age > 80) {
    return "Invalid age";
  }

  return null;
};


// ================= VERIFY SIGNATURE =================
const verifySignature = (req) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  return expected === razorpay_signature;
};


// ================= CREATE ORDER =================
router.post("/create-order", async (req, res) => {
  try {
    const { plan, trainer } = req.body;

    console.log("📦 BODY:", req.body);

    if (!plan || !trainer) {
      return res.status(400).json({ message: "Plan & trainer required" });
    }

    const finalPrice = calculatePrice(plan, trainer);

    console.log("🔥 FINAL PRICE:", finalPrice);

    const order = await razorpay.orders.create({
      amount: finalPrice * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.json({
      ...order,
      amount: finalPrice // Readable for frontend................
    });

  } catch (err) {
    console.log("❌ ORDER ERROR:", err.message);
    res.status(500).json({
      message: "Order creation failed",
      error: err.message
    });
  }
});


// ================= BUY MEMBERSHIP =================
router.post("/buy", async (req, res) => {
  try {
    const { name, email, phone, age, plan, batch, trainer } = req.body;

    const emailLower = email.toLowerCase();

    // VALIDATION
    const error = validateUser({
      name,
      email: emailLower,
      phone,
      age,
      plan,
      batch,
      trainer
    });

    if (error) {
      return res.status(400).json({ message: error });
    }

    // DUPLICATE CHECK
    const existing = await Membership.findOne({ email: emailLower });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // VERIFY PAYMENT
    if (!verifySignature(req)) {
      return res.status(400).json({ message: "Invalid payment ❌" });
    }

    const finalPrice = calculatePrice(plan, trainer);

    // ================= EXPIRY (FIXED BUG) =================
    const now = new Date();
    let expiryDate = new Date(now); // clone

    if (plan === "Monthly") expiryDate.setMonth(expiryDate.getMonth() + 1);
    else if (plan === "Quarterly") expiryDate.setMonth(expiryDate.getMonth() + 3);
    else if (plan === "Half Yearly") expiryDate.setMonth(expiryDate.getMonth() + 6);
    else if (plan === "Yearly") expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    // PASSWORD
    const rawPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // TRAINER DATA
    let trainerData = {};

    if(trainer === "yes"){
      trainerData = {
        trainerName: "Rahul Fitness",
        trainerPhone: "7976097513",
        trainerInsta: "www.instagram.com"
      };
    }

    // SAVE USER
    const newUser = new Membership({
      name,
      email: emailLower,
      phone,
      age,
      plan,
      price: finalPrice,
      password: hashedPassword,
      expiryDate,
      batch,
      trainer,
      trainerType: trainer === "yes" ? "Personal" : "Public",
      trainerData
    });

    await newUser.save();

    // EMAIL
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: emailLower,
        subject: "Membership Activated",
        text: `Welcome!

Email: ${emailLower}
Password: ${rawPassword}

Plan: ${plan}
Trainer: ${trainer === "yes" ? "Personal" : "Public"}
Paid: ₹${finalPrice}

Login:
http://localhost:5173/login`,
      });

      console.log("✅ EMAIL SENT");

    } catch (e) {
      console.log("❌ EMAIL ERROR:", e.message);
    }

    res.json({
      success: true,
      message: "Membership Purchased ✅",
      user: newUser
    });

  } catch (err) {
    console.log("❌ BUY ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= RENEW =================
router.post("/renew", async (req, res) => {
  try {
    if (!verifySignature(req)) {
      return res.status(400).json({ message: "Invalid Payment ❌" });
    }

    const { email, plan } = req.body;
    const emailLower = email.toLowerCase();

    const user = await Membership.findOne({ email: emailLower });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let baseDate = new Date();

    if (user.expiryDate && user.expiryDate > new Date()) {
      baseDate = new Date(user.expiryDate);
    }

    let newExpiry = new Date(baseDate);

    if (plan === "Monthly") newExpiry.setMonth(newExpiry.getMonth() + 1);
    else if (plan === "Quarterly") newExpiry.setMonth(newExpiry.getMonth() + 3);
    else if (plan === "Half Yearly") newExpiry.setMonth(newExpiry.getMonth() + 6);
    else if (plan === "Yearly") newExpiry.setFullYear(newExpiry.getFullYear() + 1);

    user.expiryDate = newExpiry;
    await user.save();

    res.json({
      success: true,
      message: "Membership Renewed 🔄",
      user
    });

  } catch (err) {
    console.log("❌ RENEW ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;