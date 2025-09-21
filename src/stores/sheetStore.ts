import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SheetState {
  spreadsheetId?: string;
  setSpreadsheetId: (spreadsheetId: string) => void;
  sheetId?: number;
  setSheetId: (sheetId: number) => void;
  resetSheetConfig: () => void;
}

export const useSheetStore = create<SheetState>()(
  persist(
    (set) => ({
      spreadsheetId: undefined,
      setSpreadsheetId: (spreadsheetId: string) => set({ spreadsheetId }),
      sheetId: undefined,
      setSheetId: (sheetId: number) => set({ sheetId }),
      resetSheetConfig: () =>
        set({ spreadsheetId: undefined, sheetId: undefined }),
    }),
    { name: "sheet-storage" }
  )
);
