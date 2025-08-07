import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SheetState {
  sheetId?: string;
  setSheetId: (sheetId: string) => void;
  sheetIndex?: number;
  setSheetIndex: (sheetIndex: number) => void;
  mutationCounter: number;
  triggerMutationCounter: () => void;
}

export const useSheetStore = create<SheetState>()(
  persist(
    (set) => ({
      sheetId: undefined,
      setSheetId: (sheetId: string) => set({ sheetId }),
      sheetIndex: undefined,
      setSheetIndex: (sheetIndex: number) => set({ sheetIndex }),
      mutationCounter: 0,
      triggerMutationCounter: () =>
        set((state) => ({ mutationCounter: state.mutationCounter + 1 })),
    }),
    { name: "sheet-storage" }
  )
);
