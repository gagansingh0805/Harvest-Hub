import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import WeatherCard from "../components/WeatherCard";
import { getWeatherByCoords, getWeatherByCity } from "../api/weatherApi";
import {
  MapPin,
  RefreshCw,
  Loader2,
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
} from "lucide-react";

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLocationAndWeather();
  }, []);

  const getLocationAndWeather = async () => {
    try {
      setIsLoading(true);
      setError(null);

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
      setError("Failed to get weather data");
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
        city: "India",
      };
      setWeatherData(mockWeather);
      setLocation({ name: "India" });
    }
  };

  const refreshWeather = () => {
    getLocationAndWeather();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 pt-20 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Getting Weather Data
          </h2>
          <p className="text-gray-600">
            Fetching latest weather information...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100">
      {/* Header Section with proper navbar spacing */}
      <div className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Weather Dashboard
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real-time weather insights for smart agricultural decisions
            </p>
          </motion.div>

          {/* Location and Refresh Section */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Current Location
                </h3>
                <p className="text-gray-600">
                  {location?.name || "Unknown Location"}
                </p>
              </div>
            </div>

            <button
              onClick={refreshWeather}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <RefreshCw
                className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
              />
              <span>Refresh Weather</span>
            </button>
          </motion.div>

          {/* Weather Card Section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <WeatherCard weatherData={weatherData} />
          </motion.div>

          {/* Weather Statistics Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              {
                icon: Thermometer,
                title: "Temperature",
                value: weatherData?.temperature || "28°C",
                subtitle: "Current temperature",
                color: "from-red-400 to-orange-500",
                bgColor: "from-red-50 to-orange-50",
              },
              {
                icon: Droplets,
                title: "Humidity",
                value: weatherData?.humidity || "65%",
                subtitle: "Relative humidity",
                color: "from-blue-400 to-cyan-500",
                bgColor: "from-blue-50 to-cyan-50",
              },
              {
                icon: Wind,
                title: "Wind Speed",
                value: weatherData?.windSpeed || "8 km/h",
                subtitle: "Current wind speed",
                color: "from-green-400 to-teal-500",
                bgColor: "from-green-50 to-teal-50",
              },
              {
                icon: weatherData?.condition?.toLowerCase().includes("rain")
                  ? CloudRain
                  : weatherData?.condition?.toLowerCase().includes("cloud")
                  ? Cloud
                  : Sun,
                title: "Condition",
                value: weatherData?.condition || "Clear",
                subtitle: "Current weather",
                color: "from-purple-400 to-indigo-500",
                bgColor: "from-purple-50 to-indigo-50",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${stat.bgColor} p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600">{stat.subtitle}</p>
              </div>
            ))}
          </motion.div>

          {/* Agricultural Insights */}
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Sun className="w-7 h-7 text-yellow-500 mr-3" />
              Agricultural Insights
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Crop Recommendations
                </h3>
                <div className="space-y-3">
                  {weatherData?.temperature &&
                  parseInt(weatherData.temperature) > 30 ? (
                    <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-orange-800">
                          High Temperature Alert
                        </p>
                        <p className="text-sm text-orange-700">
                          Consider heat-resistant crops and increase irrigation
                          frequency.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-green-800">
                          Optimal Conditions
                        </p>
                        <p className="text-sm text-green-700">
                          Great weather for most crop varieties. Maintain
                          regular irrigation schedule.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Today's Action Items
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-gray-700">
                      Check soil moisture levels
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-gray-700">Monitor crop health</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span className="text-gray-700">
                      Update irrigation schedule
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
