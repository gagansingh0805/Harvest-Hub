const express = require("express");
const {
  getAllSchemes,
  getUserRelevantSchemes,
  getSchemeById,
} = require("../controllers/schemeController");
const { protect } = require("../middlewares/authMiddlewares");

const router = express.Router();

// Protected routes - require authentication (put before /:id route)
router.get("/user/relevant", protect, getUserRelevantSchemes);

// Public routes - no authentication needed
router.get("/", getAllSchemes);
router.get("/:id", getSchemeById);

module.exports = router;
