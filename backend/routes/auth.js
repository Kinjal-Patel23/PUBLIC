const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET = "mysecretkey";

// ---------------- SIGNUP ----------------
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ message: "All fields are required" });
  }

  // check if user exists
  User.findOne({ email }).then((existingUser) => {
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    // hash password
    bcrypt.hash(password, 10).then((hashedPassword) => {
      User.create({ name, email, password: hashedPassword })
        .then((user) => res.json({ message: "Signup successful", user }))
        .catch(() => res.status(500).json({ message: "Signup failed" }));
    });
  });
});

// ---------------- LOGIN ----------------
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) return res.json({ message: "User not found" });

      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) return res.json({ message: "Invalid password" });

        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1d" });

        res.json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        });
      });
    })
    .catch(() => res.status(500).json({ message: "Login error" }));
});

module.exports = router;
