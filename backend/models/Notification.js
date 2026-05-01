const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  email: String,
  title: String,
  message: String
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);