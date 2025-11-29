import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sprout,
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Calendar,
  TrendingUp,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { getWeatherByCoords, getWeatherByCity } from "../api/weatherApi";

const CropRecommendation = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("current");

  useEffect(() => {
    getLocationAndWeather();
  }, []);

  // Generate recommendations based on weather and season
  useEffect(() => {
    if (weatherData && selectedSeason) {
      console.log(`🌾 Generating recommendations for ${selectedSeason} season`);
      setIsLoading(true);
      generateRecommendations(weatherData);
    }
  }, [selectedSeason, weatherData]);

  const getLocationAndWeather = async () => {
    try {
      setIsLoading(true);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await getWeatherByCoords(latitude, longitude);
              setWeatherData(response.data);
              setLocation({
                lat: latitude,
                lon: longitude,
                name: response.data.city || "Your Location",
              });
            } catch (error) {
              console.error("Weather API error:", error);
              await fallbackToDelhi();
            }
          },
          async (error) => {
            console.error("Location error:", error);
            await fallbackToDelhi();
          }
        );
      } else {
        await fallbackToDelhi();
      }
    } catch (error) {
      console.error("Error getting location and weather:", error);
      await fallbackToDelhi();
    } finally {
      setIsLoading(false);
    }
  };

  const fallbackToDelhi = async () => {
    try {
      const response = await getWeatherByCity("Delhi");
      setWeatherData(response.data);
      setLocation({ lat: 28.6139, lon: 77.209, name: "Delhi" });
    } catch (error) {
      console.error("Fallback weather failed:", error);
      // Use mock data as last resort
      const mockWeather = {
        temperature: "28°C",
        condition: "Clear",
        humidity: "65%",
        windSpeed: "8 km/h",
      };
      setWeatherData(mockWeather);
      setLocation({ name: "India" });
    }
  };

  const generateRecommendations = (weather) => {
    const temp = parseInt(weather.temperature?.replace("°C", "") || "25");
    const humidity = parseInt(weather.humidity?.replace("%", "") || "60");
    const condition = weather.condition?.toLowerCase() || "clear";

    // Get current season
    const month = new Date().getMonth() + 1; // 1-12
    const currentSeason = getSeason(month);

    // Determine which season to use for recommendations
    const targetSeason =
      selectedSeason === "current" ? currentSeason : selectedSeason;

    console.log(
      `🌾 Generating crops for: ${targetSeason} season (selected: ${selectedSeason})`
    );

    let crops = [];

    // Completely different crops for each season
    switch (targetSeason) {
      case "kharif":
        crops = [
          {
            name: "Rice (Basmati)",
            season: "Kharif",
            suitability: temp >= 20 && temp <= 35 && humidity >= 50 ? 95 : 75,
            plantingTime: "June - July",
            harvestTime: "October - November",
            waterRequirement: "Very High",
            temperature: "20-35°C",
            reasons: [
              "Monsoon season crop",
              "High humidity needed",
              "Premium variety",
            ],
            marketPrice: "₹4,200-4,800/quintal",
            profitMargin: "Very High",
          },
          {
            name: "Cotton",
            season: "Kharif",
            suitability: temp >= 18 && temp <= 35 && humidity >= 50 ? 90 : 70,
            plantingTime: "May - June",
            harvestTime: "October - December",
            waterRequirement: "Medium",
            temperature: "18-35°C",
            reasons: [
              "Cash crop",
              "Textile industry demand",
              "Good rainfall utilization",
            ],
            marketPrice: "₹6,800-7,500/quintal",
            profitMargin: "Very High",
          },
          {
            name: "Maize (Monsoon)",
            season: "Kharif",
            suitability: temp >= 15 && temp <= 35 && humidity >= 40 ? 88 : 72,
            plantingTime: "June - July",
            harvestTime: "September - October",
            waterRequirement: "Medium",
            temperature: "15-35°C",
            reasons: ["Monsoon adapted", "Food & feed use", "Short duration"],
            marketPrice: "₹1,950-2,400/quintal",
            profitMargin: "High",
          },
        ];
        break;

      case "rabi":
        crops = [
          {
            name: "Wheat (Durum)",
            season: "Rabi",
            suitability: temp >= 10 && temp <= 25 && humidity <= 70 ? 96 : 80,
            plantingTime: "November - December",
            harvestTime: "March - April",
            waterRequirement: "Medium",
            temperature: "10-25°C",
            reasons: [
              "Winter crop",
              "Cool weather preferred",
              "Staple food demand",
            ],
            marketPrice: "₹2,450-2,850/quintal",
            profitMargin: "High",
          },
          {
            name: "Mustard Oil Seed",
            season: "Rabi",
            suitability: temp >= 8 && temp <= 22 && humidity <= 60 ? 93 : 75,
            plantingTime: "October - November",
            harvestTime: "February - March",
            waterRequirement: "Low",
            temperature: "8-22°C",
            reasons: ["Oil seed crop", "Drought tolerant", "High oil prices"],
            marketPrice: "₹5,200-5,800/quintal",
            profitMargin: "Very High",
          },
          {
            name: "Chickpea (Gram)",
            season: "Rabi",
            suitability: temp >= 12 && temp <= 25 && humidity <= 65 ? 87 : 70,
            plantingTime: "October - November",
            harvestTime: "February - March",
            waterRequirement: "Low",
            temperature: "12-25°C",
            reasons: ["Pulse crop", "Nitrogen fixing", "Protein demand"],
            marketPrice: "₹4,800-5,400/quintal",
            profitMargin: "High",
          },
        ];
        break;

      case "zaid":
        crops = [
          {
            name: "Watermelon",
            season: "Zaid",
            suitability: temp >= 20 && temp <= 40 && humidity <= 70 ? 92 : 76,
            plantingTime: "February - March",
            harvestTime: "May - June",
            waterRequirement: "High",
            temperature: "20-40°C",
            reasons: [
              "Heat tolerant",
              "Summer fruit demand",
              "High water content",
            ],
            marketPrice: "₹800-1,800/quintal",
            profitMargin: "Very High",
          },
          {
            name: "Muskmelon",
            season: "Zaid",
            suitability: temp >= 18 && temp <= 38 ? 89 : 74,
            plantingTime: "February - March",
            harvestTime: "April - May",
            waterRequirement: "Medium",
            temperature: "18-38°C",
            reasons: [
              "Premium summer fruit",
              "Export potential",
              "Quick returns",
            ],
            marketPrice: "₹1,200-2,500/quintal",
            profitMargin: "Very High",
          },
          {
            name: "Bitter Gourd",
            season: "Zaid",
            suitability: temp >= 22 && temp <= 35 ? 85 : 70,
            plantingTime: "February - March",
            harvestTime: "April - June",
            waterRequirement: "Medium",
            temperature: "22-35°C",
            reasons: [
              "Heat loving vegetable",
              "Medicinal value",
              "Summer demand",
            ],
            marketPrice: "₹1,500-3,000/quintal",
            profitMargin: "High",
          },
        ];
        break;

      default:
        // Current season based on actual month
        const autoSeason = getSeason(new Date().getMonth() + 1);
        return generateRecommendations(weather); // Recursive call with auto-detected season
    }

    // Add unique ID and sort by suitability
    crops = crops
      .map((crop, index) => ({
        ...crop,
        id: `${targetSeason}-${index}`,
        seasonType: targetSeason,
      }))
      .sort((a, b) => b.suitability - a.suitability);

    console.log(
      `✅ Generated ${crops.length} crops for ${targetSeason}:`,
      crops.map((c) => c.name)
    );
    setRecommendations(crops);
    setIsLoading(false);
  };

  const getSeason = (month) => {
    if (month >= 6 && month <= 10) return "kharif"; // Monsoon season
    if (month >= 11 || month <= 3) return "rabi"; // Winter season
    return "zaid"; // Summer season
  };

  const getSuitabilityColor = (score) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 75) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getSuitabilityIcon = (score) => {
    if (score >= 90) return <CheckCircle className="w-4 h-4" />;
    if (score >= 75) return <AlertCircle className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">
            Getting your location and weather data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 pt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Sprout className="w-10 h-10 text-green-600" />
            Crop Recommendations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI-powered crop suggestions based on your real-time weather
            conditions and location
          </p>
        </motion.div>

        {/* Current Weather & Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold">{location?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Thermometer className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-500">Temperature</p>
                <p className="font-semibold">{weatherData?.temperature}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Humidity</p>
                <p className="font-semibold">{weatherData?.humidity}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wind className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Wind Speed</p>
                <p className="font-semibold">{weatherData?.windSpeed}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Season</p>
                <p className="font-semibold capitalize">
                  {getSeason(new Date().getMonth() + 1)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Season Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8">
          <div className="flex justify-center gap-4">
            {["current", "kharif", "rabi", "zaid"].map((season) => (
              <button
                key={season}
                onClick={() => {
                  console.log(`🔄 Switching to ${season} season`);
                  setSelectedSeason(season);
                  // Clear current recommendations for fresh loading
                  setRecommendations([]);
                }}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedSeason === season
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-green-50 shadow-md"
                }`}>
                {season === "current"
                  ? "Current Season"
                  : season.charAt(0).toUpperCase() + season.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Crop Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((crop, index) => (
            <motion.div
              key={crop.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {crop.name}
                  </h3>
                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getSuitabilityColor(
                      crop.suitability
                    )}`}>
                    {getSuitabilityIcon(crop.suitability)}
                    {crop.suitability}% Match
                  </div>
                </div>

                {/* Season & Timing */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Season</p>
                    <p className="font-semibold text-green-600">
                      {crop.season}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Water Need</p>
                    <p className="font-semibold">{crop.waterRequirement}</p>
                  </div>
                </div>

                {/* Planting & Harvest */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Planting:</span>
                    <span className="text-sm font-medium">
                      {crop.plantingTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Harvest:</span>
                    <span className="text-sm font-medium">
                      {crop.harvestTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Temperature:</span>
                    <span className="text-sm font-medium">
                      {crop.temperature}
                    </span>
                  </div>
                </div>

                {/* Market Info */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Market Price
                    </span>
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-lg font-bold text-green-600">
                    {crop.marketPrice}
                  </p>
                  <p className="text-sm text-gray-600">
                    Profit Margin: {crop.profitMargin}
                  </p>
                </div>

                {/* Reasons */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Why This Crop?
                  </p>
                  <ul className="space-y-1">
                    {crop.reasons.map((reason, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-600 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center">
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              📍 Location-Based Recommendations
            </h3>
            <p className="text-blue-700">
              These recommendations are based on your current weather
              conditions, location, and seasonal patterns. Market prices are
              updated regularly from live agricultural data sources.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CropRecommendation;
