const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully ✅"))
  .catch(err => console.log(err));
console.log("MONGO_URI",process.env.MONGO_URI);

const Membership = require("./models/membership");

(async () => {
  await Membership.updateMany(
    { paymentMethod: { $exists: false } },
    { $set: { paymentMethod: "online" } }
  );
  // console.log("✅ Old users fixed");
})();

// connectDB();

app.use(cors());
app.use(express.json());
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({ limit: "10mb", extended:true }));

app.get("/", (req, res) => {
  res.send("Gym Backend Running");
});

const contactRoutes = require("./routes/ContactRoute");
app.use("/api",contactRoutes);

const membershipRoute = require("./routes/membershipRoute");
app.use("/api/membership",membershipRoute);

const statsRoute = require("./routes/statsRoute");
app.use("/api",statsRoute);

const userRoute = require("./routes/userRoute");
app.use("/api/user",userRoute);

const authRoute = require("./routes/loginRoute");
app.use("/api/auth",authRoute);

const paymentRoute = require("./routes/paymentRoute");
app.use("/api/payment",paymentRoute);

const adminRoute = require("./routes/adminRoute");
app.use("/api/admin",adminRoute);

const feedbackRoute = require("./routes/feedbackRoute");
app.use("/api",feedbackRoute);

// const trainerRoute = require("./routes/trainerRoute");
// app.use("/api",trainerRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});