import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token?: string;
  setToken: (token?: string) => void;
  session?: string;
  setSession: (session?: string) => void;
  email?: string;
  setEmail: (email?: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: undefined,
      setToken: (token?: string) => set({ token }),
      session: undefined,
      setSession: (session?: string) => set({ session }),
      email: undefined,
      setEmail: (email?: string) => set({ email }),
      clearAuth: () =>
        set({ token: undefined, session: undefined, email: undefined }),
    }),
    { name: "auth-storage" }
  )
);
