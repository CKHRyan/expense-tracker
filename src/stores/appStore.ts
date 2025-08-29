import type { AppLocale } from "@utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  locale?: AppLocale;
  setLocale: (locale: AppLocale) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      locale: undefined,
      setLocale: (locale: AppLocale) => set({ locale }),
    }),
    { name: "app-storage" }
  )
);
