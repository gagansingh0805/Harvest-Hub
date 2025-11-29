import axiosInstance from "../utils/axiosInstance";

// Get all market prices with optional filters
export const getAllMarketPrices = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (filters.state) queryParams.append("state", filters.state);
    if (filters.commodity) queryParams.append("commodity", filters.commodity);
    if (filters.limit) queryParams.append("limit", filters.limit);

    const url = `/api/market/prices${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    console.error("Error fetching market prices:", error);
    throw error.response?.data || { message: "Failed to fetch market prices" };
  }
};

// Get market trends
export const getMarketTrends = async () => {
  try {
    const response = await axiosInstance.get("/api/market/trends");
    return response.data;
  } catch (error) {
    console.error("Error fetching market trends:", error);
    throw error.response?.data || { message: "Failed to fetch market trends" };
  }
};

// Get price analysis for specific commodity
export const getPriceAnalysis = async (commodity) => {
  try {
    const response = await axiosInstance.get(
      `/api/market/analysis/${commodity}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching price analysis:", error);
    throw error.response?.data || { message: "Failed to fetch price analysis" };
  }
};
