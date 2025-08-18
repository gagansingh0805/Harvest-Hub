const express = require("express")
const { signup, login,getProfile } = require("../controllers/authControllers")
const router = express.Router()
const {protect}= require("../middlewares/authMiddlewares")

// @route   POST /api/auth/register
// @desc    Register new user
//@access public
router.post("/signup", signup);

// @route   POST /api/auth/login
// @desc    Login user & return JWT
//@access public

router.post("/login", login);

//@route GET /api/auth/getProfile
//@desc   get user profile
//@access private require jwt 

router.get("/profile", protect, getProfile); // get user profile


module.exports = router;