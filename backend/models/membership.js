const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: String,
  age: Number,
  plan: String,
  price: Number,

  password: {
    type: String,
    required: true
  },

    expiryDate: {
    type: Date
  },

  paymentMethod:{
    type:String,
    enum:["online","cash"],
    default:"online"  
  },


    batch: {
    type: String,
    enum:["Morning","Evening"],
    required:true
  },
    trainer: {
      type:String,
      enum:["yes","no"],
      default:"no"
    },
    trainerName:String,
    trainerPhone:String,
    trainerInsta:String,

}, { timestamps: true });
module.exports = mongoose.model("Membership", membershipSchema);