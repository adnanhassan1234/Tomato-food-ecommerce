// controllers/authController.js
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");
var validator = require("validator");
const bcrypt = require("bcryptjs");

// create a token

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// LOGIN USER
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email or password missing" });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User Does't exist" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = createToken(user._id);
    const id = user._id;

    res.json({ success: true, message: "Login successfully!", token, id });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// REGISTER USER
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password with minimum 8 characters",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({
      success: true,
      message: "User registered successfully!",
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { loginUser, registerUser };
