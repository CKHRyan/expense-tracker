import { StorageMode } from "@features/ExpenseInput/types";
import type { AppLocale } from "@utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  locale?: AppLocale;
  setLocale: (locale: AppLocale) => void;
  storageMode: StorageMode;
  setStorageMode: (storageMode: StorageMode) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      locale: undefined,
      setLocale: (locale: AppLocale) => set({ locale }),
      storageMode: StorageMode.LOCAL,
      setStorageMode: (storageMode: StorageMode) => set({ storageMode }),
    }),
    { name: "app-storage" }
  )
);
