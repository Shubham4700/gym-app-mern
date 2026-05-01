const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const Membership = require("../models/membership");
const nodemailer = require("nodemailer");

// ================= EMAIL CONFIG =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

// ================= SEND NOTICE =================
router.post("/send-notice", async (req, res) => {
  try {
    const { email, title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({ message: "Title & message required" });
    }

    // ================= SEND TO ALL =================
    if (email === "all") {

      const users = await Membership.find();

      if (!users.length) {
        return res.status(404).json({ message: "No users found" });
      }

      for (let u of users) {

        // 🔔 Save notification
        await Notification.create({
          email: u.email,
          title,
          message
        });

        // 📧 Send email (safe)
        try {
          await transporter.sendMail({
            from: process.env.EMAIL,
            to: u.email,
            subject: title,
            text: message
          });
        } catch (mailErr) {
          console.log("Email failed for:", u.email);
        }
      }

      return res.json({
        success: true,
        message: "Notice sent to all users"
      });
    }

    // ================= SINGLE USER =================
    else {

      // 🔔 Save notification
      await Notification.create({
        email,
        title,
        message
      });

      // 📧 Send email
      try {
        await transporter.sendMail({
          from: process.env.EMAIL,
          to: email,
          subject: title,
          text: message
        });
      } catch (mailErr) {
        console.log("Email failed:", mailErr);
      }

      return res.json({
        success: true,
        message: "Notice sent"
      });
    }

  } catch (error) {
    console.log("NOTICE ERROR:", error);
    res.status(500).json({ message: "Failed to send notice" });
  }
});


// ================= GET USER NOTIFICATIONS =================
router.get("/notifications/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const notifications = await Notification.find({ email })
      .sort({ createdAt: -1 });

    res.json(notifications);

  } catch (error) {
    console.log("FETCH NOTIFICATION ERROR:", error);
    res.status(500).json({ message: "Error fetching notifications" });
  }
});


module.exports = router;