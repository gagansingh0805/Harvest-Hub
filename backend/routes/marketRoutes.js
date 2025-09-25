const express = require("express");
const {
  getAllMarketPrices,
  getMarketTrends,
  getPriceAnalysis,
} = require("../controllers/marketController");

const router = express.Router();

// Public routes - no authentication needed
router.get("/prices", getAllMarketPrices);
router.get("/trends", getMarketTrends);
router.get("/analysis/:commodity", getPriceAnalysis);

module.exports = router;
