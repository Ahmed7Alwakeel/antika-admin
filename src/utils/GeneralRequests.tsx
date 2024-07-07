import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://dev.financing.mynm.beyond-creation.net/api",
    headers: {
      Accept: "application/json",
    },
  });