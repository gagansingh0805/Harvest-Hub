import axios from "axios";
import { BASE_URL, API_PATHS } from "../utils/apiPath";

// Create a separate axios instance for weather (no auth required)
const weatherAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Get weather data by coordinates
export const getWeatherByCoords = async (lat, lon) => {
  try {
    console.log("Fetching weather for coords:", lat, lon);
    const response = await weatherAxios.get(
      `${API_PATHS.WEATHER.GET_WEATHER}?lat=${lat}&lon=${lon}`
    );
    console.log("Weather API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather by coords:", error);
    throw error.response?.data || { message: "Failed to fetch weather data" };
  }
};

// Get weather data by city name
export const getWeatherByCity = async (city) => {
  try {
    console.log("Fetching weather for city:", city);
    const response = await weatherAxios.get(
      `${API_PATHS.WEATHER.GET_WEATHER}?city=${city}`
    );
    console.log("Weather API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather by city:", error);
    throw error.response?.data || { message: "Failed to fetch weather data" };
  }
};
