import { create } from "zustand";

interface AppState {
  isOpenExpenseSheet: boolean;
  setIsOpenExpenseSheet: (isOpenExpenseSheet: boolean) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  isOpenExpenseSheet: false,
  setIsOpenExpenseSheet: (isOpenExpenseSheet: boolean) =>
    set({ isOpenExpenseSheet }),
}));
