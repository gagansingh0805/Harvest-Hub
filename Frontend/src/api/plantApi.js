import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

// Function to upload images and get AI analysis
export const analyzePlant = async (formData) => {
  const res = await axiosInstance.post(API_PATHS.PLANTS.ANALYZE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
