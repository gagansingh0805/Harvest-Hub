const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddlewares");
const {
  addCrop,
  getUserCrops,
  updateCrop,
  deleteCrop,
} = require("../controllers/cropController");

// Protected routes - require authentication
router.use(protect);

// POST /api/crops - Add new crop
router.post("/", addCrop);

// GET /api/crops - Get all user crops
router.get("/", getUserCrops);

// PUT /api/crops/:cropId - Update crop stage
router.put("/:cropId", updateCrop);

// DELETE /api/crops/:cropId - Delete crop
router.delete("/:cropId", deleteCrop);

module.exports = router;
