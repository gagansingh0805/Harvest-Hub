const express = require("express");
const {
  getWeatherData,
  getWeatherForecast,
} = require("../controllers/weatherController");

const router = express.Router();

// @route   GET /api/weather/current
// @desc    Get current weather data
// @access  Public
router.get("/current", getWeatherData);

// @route   GET /api/weather/forecast
// @desc    Get weather forecast
// @access  Public
router.get("/forecast", getWeatherForecast);

module.exports = router;
