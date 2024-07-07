import axios from "axios";
import { API_URL } from "./APIs";

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      Accept: "application/json",
    },
  });