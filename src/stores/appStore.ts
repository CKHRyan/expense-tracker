import type { ExpenseRecordWithIndex } from "src/types/expense";
import { create } from "zustand";

export type ExpenseSheetParams = {
  isOpen: boolean;
  isEdit: boolean;
  expenseRecord?: ExpenseRecordWithIndex;
};

const initialExpenseSheetParams: ExpenseSheetParams = {
  isOpen: false,
  isEdit: false,
  expenseRecord: undefined,
};

interface AppState {
  expenseSheetParams: ExpenseSheetParams;
  openNewExpenseSheet: () => void;
  openEditExpenseSheet: (expenseRecord: ExpenseRecordWithIndex) => void;
  closeExpenseInputSheet: () => void;
}

export const useAppStore = create<AppState>()((set) => ({
  expenseSheetParams: initialExpenseSheetParams,
  openNewExpenseSheet: () =>
    set({ expenseSheetParams: { isOpen: true, isEdit: false } }),
  openEditExpenseSheet: (expenseRecord) =>
    set({ expenseSheetParams: { isOpen: true, isEdit: true, expenseRecord } }),
  closeExpenseInputSheet: () =>
    set({ expenseSheetParams: initialExpenseSheetParams }),
}));
