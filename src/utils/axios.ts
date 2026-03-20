import { config } from "@utils/config";
import axios from "axios";

export const authAxios = axios.create({
  baseURL: config.authServiceHost,
});
