import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token?: string;
  setToken: (token?: string) => void;
  email?: string;
  setEmail: (email?: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: undefined,
      setToken: (token?: string) => set({ token }),
      email: undefined,
      setEmail: (email?: string) => set({ email }),
      clearAuth: () => set({ token: undefined, email: undefined }),
    }),
    { name: "auth-storage" }
  )
);
