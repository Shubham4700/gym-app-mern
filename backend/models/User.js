const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: String,
  age: Number,
  plan: String,
});

module.exports = mongoose.model("User", userSchema);