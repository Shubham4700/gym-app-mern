const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const nodemailer = require("nodemailer");

router.post("/contact", async (req, res) => {

try {

const { name, email, message } = req.body;

// Save to MongoDB
const newContact = new Contact({
name,
email,
message
});

await newContact.save();

// Email transporter
const transporter = nodemailer.createTransport({
service:"gmail",
auth:{
user:"learn4coders@gmail.com",
pass:"pmau ixrd bqjs npbn"
}
});

// Send auto reply to user
await transporter.sendMail({

from:"learn4coders@gmail.com",
to:email,

subject:"Fitness Point Support",

text:`Hello ${name},

Thank you for contacting Fitness Point.

We received your message:
Our team will contact you soon.

Regard:
Fitness Point Team 💪`

});

res.json({message:"Message sent successfully"});

} catch(error){

console.log(error);
res.status(500).json({message:"Error sending message"});

}

});

module.exports = router;