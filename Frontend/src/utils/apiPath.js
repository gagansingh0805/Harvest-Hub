export const BASE_URL = "http://localhost:8080";

export const API_PATHS = {
  AUTH: {
    SIGNUP: "/api/auth/signup", // Signup
    LOGIN: "/api/auth/login", // Authenticate user & return JWT token
    GET_PROFILE: "/api/auth/profile", // Get logged-in user details
  },
  
  PLANTS: {
    ANALYZE: "/api/plants/analyze", // AI plant disease detection
  },

  CROPS: {
    GET_ALL: "/api/crops", // Get all user crops
    ADD_CROP: "/api/crops", // Add new crop
    UPDATE_CROP: "/api/crops/:id", // Update crop (replace :id with actual ID)
    DELETE_CROP: "/api/crops/:id", // Delete crop (replace :id with actual ID)
  },
};
