import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token?: string;
  setToken: (token?: string) => void;
  refreshToken?: string;
  setRefreshToken: (refreshToken?: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: undefined,
      setToken: (token?: string) => set({ token }),
      refreshToken: undefined,
      setRefreshToken: (refreshToken?: string) => set({ refreshToken }),
      clearAuth: () => set({ token: undefined, refreshToken: undefined }),
    }),
    { name: "auth-storage" }
  )
);
