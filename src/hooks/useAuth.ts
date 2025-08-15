import { useAuthStore } from "@stores";
import { useCallback } from "react";

export const useAuth = () => {
  const { token, setToken } = useAuthStore();

  const isAuth = !!token;

  const logout = useCallback(() => setToken(undefined), [setToken]);

  return { isAuth, logout };
};
