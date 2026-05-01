const express = require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

// memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });


// 🔥 UPDATE PROFILE (NAME, PHONE, AGE)
router.put("/update/:id", async (req, res) => {
  try {

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      user: updatedUser
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔥 IMAGE UPLOAD (CLOUDINARY)
router.post("/upload/:id", upload.single("image"), async (req, res) => {
  try {

    const stream = cloudinary.uploader.upload_stream(
      { folder: "gym_users" },
      async (error, result) => {

        if (error) {
          return res.status(500).json(error);
        }

        const user = await User.findById(req.params.id);

        user.image = result.secure_url;
        await user.save();

        res.json({
          success: true,
          image: result.secure_url,
          user
        });
      }
    );

    stream.end(req.file.buffer);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;