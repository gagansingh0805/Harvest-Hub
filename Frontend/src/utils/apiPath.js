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
};
