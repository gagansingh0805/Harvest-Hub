const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//generating Token
const generateWebToken = (userId) => {
  return jwt.sign({ id:userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

//Helper funtion
const generateUserRespnose = (user, token) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token,
});

//Signup handle

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // 0. Check if required fields are provided
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    //check if user exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "farmer",
    });

    //Response with user and token
    return res
      .status(201)
      .json(generateUserRespnose(user, generateWebToken(user._id)));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//login handle
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    //find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    //match passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    // ✅ return response with token
    return res.json(generateUserRespnose(user, generateWebToken(user._id)));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//Get Profile
const getProfile = async (req, res) => {
  try {
    // req.user comes from auth middleware (decoded JWT)
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
module.exports={signup,login,getProfile}
