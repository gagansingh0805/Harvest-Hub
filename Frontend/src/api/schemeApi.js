import axiosInstance from "../utils/axiosInstance";

// Get all schemes with optional filters
export const getAllSchemes = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (filters.state) queryParams.append("state", filters.state);
    if (filters.category) queryParams.append("category", filters.category);
    if (filters.landSize) queryParams.append("landSize", filters.landSize);

    const url = `/api/schemes${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    console.error("Error fetching schemes:", error);
    throw error.response?.data || { message: "Failed to fetch schemes" };
  }
};

// Get schemes relevant to the current user
export const getUserRelevantSchemes = async () => {
  try {
    const response = await axiosInstance.get("/api/schemes/user/relevant");
    return response.data;
  } catch (error) {
    console.error("Error fetching user relevant schemes:", error);
    throw (
      error.response?.data || { message: "Failed to fetch relevant schemes" }
    );
  }
};

// Get scheme by ID
export const getSchemeById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/schemes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching scheme:", error);
    throw error.response?.data || { message: "Failed to fetch scheme details" };
  }
};
