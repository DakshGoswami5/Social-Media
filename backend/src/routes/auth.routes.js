const express = require("express");
const {registerController , loginController} = require("../controllers/auth.controller");
const jwt = require("jsonwebtoken");


const router = express.Router()

router.post("/register", registerController)
router.post("/login", loginController)

router.get("/verify", (req, res) => {
  try {
    const token = req.cookies.token; // cookie se token le raha hai
    if (!token) return res.status(401).json({ success: false });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ success: false });
      res.json({ success: true, user: decoded });
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully" });
});


module.exports = router