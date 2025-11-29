const axios = require("axios");

const getWeatherData = async (req, res) => {
  try {
    // Get city or coordinates from query params
    const city = req.query.city || "Delhi";
    const lat = req.query.lat;
    const lon = req.query.lon;

    let weatherResponse;

    // Use coordinates if provided, otherwise use city name
    if (lat && lon) {
      weatherResponse = await axios.get(
        `${process.env.WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`
      );
    } else {
      weatherResponse = await axios.get(
        `${process.env.WEATHER_API_URL}/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
      );
    }

    const data = weatherResponse.data;

    // Format data similar to your screenshot
    const weatherData = {
      temperature: `${Math.round(data.main.temp)}°C`,
      condition: data.weather[0].main,
      humidity: `${data.main.humidity}%`,
      windSpeed: `${Math.round(data.wind.speed * 3.6)} km/h`, // Convert m/s to km/h
      lastUpdated: new Date().toLocaleTimeString("en-IN", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      recommendation: getWeatherRecommendation(
        data.weather[0].main,
        data.main.temp
      ),
      icon: getWeatherIcon(data.weather[0].main),
      city: data.name,
      country: data.sys.country,
    };

    res.json({
      success: true,
      data: weatherData,
      message: "Weather data retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch weather data",
      error: error.message,
    });
  }
};

// Helper function to get weather icon
const getWeatherIcon = (condition) => {
  const iconMap = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Fog: "🌫️",
    Haze: "🌫️",
  };
  return iconMap[condition] || "🌤️";
};

// Helper function to get farming recommendation
const getWeatherRecommendation = (condition, temperature) => {
  if (condition === "Rain") {
    return "Good for irrigation-free farming. Check drainage systems.";
  } else if (condition === "Clear" && temperature > 20 && temperature < 35) {
    return "Optimal conditions for crop growth";
  } else if (temperature > 35) {
    return "High temperature. Increase irrigation and provide shade for crops.";
  } else if (temperature < 10) {
    return "Cold weather. Protect crops from frost damage.";
  } else {
    return "Monitor crops regularly and adjust irrigation as needed.";
  }
};

// Get detailed weather forecast (optional)
const getWeatherForecast = async (req, res) => {
  try {
    const forecast = [
      {
        day: "Today",
        temperature: "28°C",
        condition: "Sunny",
        humidity: "60%",
        icon: "☀️",
      },
      {
        day: "Tomorrow",
        temperature: "30°C",
        condition: "Partly Cloudy",
        humidity: "65%",
        icon: "⛅",
      },
      {
        day: "Day After",
        temperature: "26°C",
        condition: "Light Rain",
        humidity: "80%",
        icon: "🌦️",
      },
    ];

    res.json({
      success: true,
      data: forecast,
      message: "Weather forecast retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch weather forecast",
      error: error.message,
    });
  }
};

module.exports = {
  getWeatherData,
  getWeatherForecast,
};
