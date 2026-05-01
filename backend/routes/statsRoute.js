const express = require("express");
const router = express.Router();

// TEMP DATA (no DB)
router.get("/stats", async (req, res) => {
  res.json({
    members: 120,
    trainers: 50,
    experience: 10,
    access: 24,
  });
});

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const Membership = require("../models/membership"); // 

// router.get("/stats", async (req, res) => {
//   try {
//     const totalMembers = await Membership.countDocuments();

//     res.json({
//       members: totalMembers,
//       trainers: 50,
//       experience: 10,
//       access: 24,
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;