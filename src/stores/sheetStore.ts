import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SheetState {
  spreadsheetId?: string;
  setSpreadsheetId: (spreadsheetId: string) => void;
  sheetId?: number;
  setSheetId: (sheetId: number) => void;
  mutationCounter: number;
  triggerMutationCounter: () => void;
}

export const useSheetStore = create<SheetState>()(
  persist(
    (set) => ({
      spreadsheetId: undefined,
      setSpreadsheetId: (spreadsheetId: string) => set({ spreadsheetId }),
      sheetId: undefined,
      setSheetId: (sheetId: number) => set({ sheetId }),
      mutationCounter: 0,
      triggerMutationCounter: () =>
        set((state) => ({ mutationCounter: state.mutationCounter + 1 })),
    }),
    { name: "sheet-storage" }
  )
);
