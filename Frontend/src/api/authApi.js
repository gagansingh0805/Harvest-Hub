import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

export const signup = async (formData) => {
  const res = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, formData);
  return res.data;
};

export const login = async (formData) => {
  const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, formData);
  return res.data;
};

export const getProfile = async () => {
  const res = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
  return res.data;
};
