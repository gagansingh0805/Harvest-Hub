import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

// Add new crop
export const addCrop = async (cropData) => {
  try {
    console.log("=== FRONTEND API DEBUG ===");
    console.log("Sending crop data:", cropData);
    console.log(
      "Token in localStorage:",
      localStorage.getItem("token") ? "Present" : "Missing"
    );
    console.log("API URL:", API_PATHS.CROPS.ADD_CROP);
    
    // Format the data to match backend expectations
    const formattedData = {
      ...cropData,
      // Ensure area is properly formatted if it contains "acres"
      area: typeof cropData.area === 'string' && cropData.area.includes('acres')
        ? parseFloat(cropData.area.replace(/[^\d.]/g, ''))
        : cropData.area,
      // Make sure growthStage maps to currentStage
      currentStage: cropData.currentStage || cropData.growthStage || "Seeded"
    };
    
    console.log("Formatted crop data:", formattedData);

    const response = await axiosInstance.post(API_PATHS.CROPS.ADD_CROP, formattedData);
    console.log("API Response:", response);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("=== API ERROR DEBUG ===");
    console.error("Full error object:", error);
    console.error("Error response:", error.response);
    console.error("Error response data:", error.response?.data);
    console.error("Error status:", error.response?.status);
    console.error("Error message:", error.message);
    throw error.response?.data || { message: "Failed to add crop" };
  }
};

// Get all user crops
export const getUserCrops = async () => {
  try {
    console.log("Fetching user crops from:", API_PATHS.CROPS.GET_ALL);
    const response = await axiosInstance.get(API_PATHS.CROPS.GET_ALL);
    console.log("Fetched crops data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user crops:", error);
    throw error.response?.data || { message: "Failed to fetch crops" };
  }
};

// Update crop stage
export const updateCrop = async (cropId, updateData) => {
  try {
    const url = API_PATHS.CROPS.UPDATE_CROP.replace(":id", cropId);
    console.log("Updating crop at URL:", url, "with data:", updateData);
    const response = await axiosInstance.put(url, updateData);
    console.log("Update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating crop:", error);
    throw error.response?.data || { message: "Failed to update crop" };
  }
};

// Delete crop
export const deleteCrop = async (cropId) => {
  try {
    const url = API_PATHS.CROPS.DELETE_CROP.replace(":id", cropId);
    console.log("Deleting crop at URL:", url);
    const response = await axiosInstance.delete(url);
    console.log("Delete response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting crop:", error);
    throw error.response?.data || { message: "Failed to delete crop" };
  }
};
