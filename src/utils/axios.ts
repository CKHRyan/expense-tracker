import axios from "axios";

export const authAxios = axios.create({
  baseURL: import.meta.env.VITE_AUTH_SERVICE_HOST,
});
