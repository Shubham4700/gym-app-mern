const express = require("express");
const router = express.Router();
const Membership = require("../models/membership");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Notification = require("../models/Notification");
const PDFDocument = require("pdfkit");

// ================= HELPER =================
const getExpiryDate = (plan) => {
  const date = new Date();

  if (plan === "Monthly") return new Date(date.setMonth(date.getMonth() + 1));
  if (plan === "Quarterly") return new Date(date.setMonth(date.getMonth() + 3));
  if (plan === "Half Yearly") return new Date(date.setMonth(date.getMonth() + 6));
  if (plan === "Yearly") return new Date(date.setFullYear(date.getFullYear() + 1));

  return null;
};

// ================= PRICE CALCULATION =================
const calculatePrice = (plan, trainer) => {
  let price = 0;
  let months = 1;

  if (plan === "Monthly") {
    price = 1000;
    months = 1;
  }

  if (plan === "Quarterly") {
    price = 2500;
    months = 3;
  }

  if (plan === "Half Yearly") {
    price = 5000;
    months = 6;
  }

  if (plan === "Yearly") {
    price = 9000;
    months = 12;
  }

  if (trainer === "yes") {
    price += 1000 * months;
  }

  return price;
};

// ================= CREATE MEMBERSHIP =================
router.post("/create-after-payment", async (req, res) => {
  try {
    console.log("🔥 CREATE MEMBERSHIP HIT");

    const { name, email, phone, age, plan, batch, trainer } = req.body;

    if (!name || !email || !phone || !age || !plan || !batch || !trainer) {
      return res.status(400).json({ message: "All fields required" });
    }

    const emailLower = email.toLowerCase();

    const existingUser = await Membership.findOne({ email: emailLower });
    if (existingUser) {
      return res.status(400).json({
        message: "⚠️ Email already exists!"
      });
    }

    const expiryDate = getExpiryDate(plan);
    if (!expiryDate) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    const finalPrice = calculatePrice(plan, trainer);

    const rawPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // ✅ TRAINER DATA FIXED
    let trainerName = "";
    let trainerPhone = "";
    let trainerInsta = "";

    if (trainer === "yes") {
      trainerName = "Rahul Fitness";
      trainerPhone = "7976097513";
      trainerInsta = "https://instagram.com/rahulfitness";
    }

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
      trainerName,
      trainerPhone,
      trainerInsta,
      paymentMethod:"online"
    });

    await newUser.save();
    console.log("✅ USER SAVED");

    // ================= EMAIL + PDF =================
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });

      // 🔥 CREATE PDF
      const doc = new PDFDocument();
      let buffers = [];

      doc.on("data", buffers.push.bind(buffers));

      doc.on("end", async () => {
        const pdfData = Buffer.concat(buffers);

        await transporter.sendMail({
          from: process.env.EMAIL,
          to: emailLower,
          subject: "Fitness Point Membership + Invoice",

          html: `
            <h1>🏋️ Fitness Point</h1>
            <p>Your membership has been activated ✅</p>

            <h3>Login Details</h3>
            <p>Email: ${emailLower}</p>
            <p>Password: ${rawPassword}</p>

            <h3>Plan Details</h3>
            <p>Plan: ${plan}</p>
            <p>Trainer: ${trainer === "yes" ? "Personal Trainer" : "Public"}</p>
            <p>Payment: ONLINE </p>
            <p>Total Paid: ₹${finalPrice}</p>

            <p>Invoice attached below 📎</p>
          `,

          attachments: [
            {
              filename: "invoice.pdf",
              content: pdfData,
            },
          ],
        });

        console.log("✅ EMAIL + PDF SENT");
      });

      // 🔥 PDF DESIGN
      doc.fontSize(20).text("Fitness Point Invoice", { align: "center" });
      doc.moveDown();

      doc.fontSize(12).text(`Invoice ID: INV-${Date.now()}`);
      doc.text(`Date: ${new Date().toLocaleDateString()}`);
      doc.moveDown();

      doc.text(`Name: ${name}`);
      doc.text(`Email: ${emailLower}`);
      doc.text(`Phone: ${phone}`);
      doc.moveDown();

      doc.text(`Plan: ${plan}`);
      doc.text(`Batch: ${batch}`);
      doc.text(`Trainer: ${trainer === "yes" ? "Personal Trainer" : "Public"}`);
      doc.moveDown();

      doc.text(`Total Amount : ${finalPrice}`, {
        bold : true,
      });

      doc.moveDown();
      doc.text("Thank you for joining Fitness Point ", {
        align: "center",
      });

      doc.end();

    } catch (err) {
      console.log("❌ EMAIL ERROR:", err.message);
    }

    res.json({
      success: true,
      message: "Membership Created ✅",
      user: newUser,
    });

  } catch (error) {
    console.log("❌ MEMBERSHIP ERROR:", error.message);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

// ================= REST SAME =================
router.get("/members", async (req, res) => {
  try {
    const members = await Membership.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    console.log("FETCH ERROR:", error.message);
    res.status(500).json({ message: "Error fetching members" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password required" });
    }

    const user = await Membership.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/me/:email", async (req, res) => {
  try {
    const user = await Membership.findOne({
      email: req.params.email.toLowerCase()
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    console.log("GET USER ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/notifications/:email", async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();

    const notices = await Notification.find({ email }).sort({ createdAt: -1 });

    res.json(notices);

  } catch (err) {
    res.status(500).json({ message: "Error fetching notifications" });
  }
});

// ================= DOWNLOAD INVOICE =================

router.get("/invoice/:email", async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();

    const user = await Membership.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const PDFDocument = require("pdfkit");

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice_${Date.now()}.pdf`
    );

    doc.pipe(res);

    // 🔥 DESIGN
    doc.fontSize(20).text("Fitness Point Invoice", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Invoice ID: INV-${Date.now()}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();

    doc.text(`Name: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Phone: ${user.phone}`);
    doc.moveDown();

    doc.text(`Plan: ${user.plan}`);
    doc.text(`Batch: ${user.batch}`);
    doc.text(
      `Trainer: ${user.trainer === "yes" ? "Personal Trainer" : "Public"}`
    );

    if (user.trainer === "yes") {
      doc.moveDown();
      doc.text(`Trainer Name: ${user.trainerName}`);
      doc.text(`Trainer Phone: ${user.trainerPhone}`);
      doc.text(`Instagram: ${user.trainerInsta}`);
    }
    

    doc.moveDown();
    doc.text(`Payment Mode : ONLINE `);
    doc.text(`Total Paid: ${user.price}`, { underline: true });

    doc.moveDown();
    doc.text("Thank you for joining Fitness Point ", {
      align: "center",
    });

    doc.end();

  } catch (error) {
    console.log("INVOICE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});



// ================= ADMIN ADD MEMBER (CASH) =================
router.post("/admin-add-member", async (req, res) => {
  try {
    console.log("🔥 ADMIN ADD MEMBER");

    const { name, email, phone, age, plan, batch, trainer } = req.body;

    if (!name || !email || !phone || !age || !plan || !batch || !trainer) {
      return res.status(400).json({ message: "All fields required" });
    }

    const emailLower = email.toLowerCase();

    const existingUser = await Membership.findOne({ email: emailLower });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const expiryDate = getExpiryDate(plan);
    const finalPrice = calculatePrice(plan, trainer);

    const rawPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    let trainerName = "";
    let trainerPhone = "";
    let trainerInsta = "";

    if (trainer === "yes") {
      trainerName = "Rahul Fitness";
      trainerPhone = "7976097513";
      trainerInsta = "https://instagram.com/rahulfitness";
    }

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
      paymentMethod: "cash",
      trainerType: trainer === "yes" ? "Personal" : "Public",
      trainerName,
      trainerPhone,
      trainerInsta
    });

    await newUser.save();

    // 🔥 EMAIL + INVOICE FOR CASH USER
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });

      const doc = new PDFDocument();
      let buffers = [];

      doc.on("data", buffers.push.bind(buffers));

      doc.on("end", async () => {
        const pdfData = Buffer.concat(buffers);

        await transporter.sendMail({
          from: process.env.EMAIL,
          to: emailLower,
          subject: "Fitness Point Membership (Cash) + Invoice",

          html: `
            <h1>🏋️ Fitness Point</h1>
            <p>Your membership has been created by admin ✅</p>

            <h3>Login Details</h3>
            <p>Email: ${emailLower}</p>
            <p>Password: ${rawPassword}</p>

            <h3>Plan Details</h3>
            <p>Plan: ${plan}</p>
            <p>Payment: CASH</p>
            <p>Total Paid: ₹${finalPrice}</p>

            <p>Invoice attached below 📎</p>
          `,

          attachments: [
            {
              filename: "invoice.pdf",
              content: pdfData,
            },
          ],
        });

        console.log("✅ CASH EMAIL + PDF SENT");
      });

      doc.fontSize(20).text("Fitness Point Invoice (Cash)", { align: "center" });
      doc.moveDown();

      doc.fontSize(12).text(`Invoice ID: INV-${Date.now()}`);
      doc.text(`Date: ${new Date().toLocaleDateString()}`);
      doc.moveDown();

      doc.text(`Name: ${name}`);
      doc.text(`Email: ${emailLower}`);
      doc.text(`Phone: ${phone}`);
      doc.moveDown();

      doc.text(`Plan: ${plan}`);
      doc.text(`Batch: ${batch}`);
      doc.text(`Payment Mode : CASH`);
      doc.moveDown();

      doc.text(`Total Amount : ${finalPrice}`);

      doc.moveDown();
      doc.text("Thank you for joining Fitness Point ", {
        align: "center",
      });

      doc.end();

    } catch (err) {
      console.log("❌ CASH EMAIL ERROR:", err.message);
    }

    res.json({
      success: true,
      message: "Member Added (Cash)",
      user: newUser
    });

  } catch (error) {
    console.log("❌ ADMIN ADD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;