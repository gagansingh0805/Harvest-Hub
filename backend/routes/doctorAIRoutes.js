const express = require("express");
const { askDoctorAI } = require("../controllers/doctorAIController");
const { protect } = require("../middlewares/authMiddlewares");

const router = express.Router();

// Route: Ask Doctor AI (protected route)
router.post("/ask", protect, askDoctorAI);

module.exports = router;



