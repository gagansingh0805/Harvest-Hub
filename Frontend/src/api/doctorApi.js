import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

export const askDoctorAI = async (question, language = "hinglish") => {
  const res = await axiosInstance.post(API_PATHS.DOCTOR.ASK, { question, language });
  return res.data;
};

