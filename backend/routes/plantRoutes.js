const express = require("express");
const { analyzePlantDisease } = require("../controllers/plantController.js");
const multer = require("multer");
const {protect}=require("../middlewares/authMiddlewares.js")

const router = express.Router();

// setup multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route: upload multiple images
router.post("/analyze",protect, upload.array("images", 3), analyzePlantDisease);

module.exports=router
