const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = verifyToken;