import { useCreateExpense } from "src/queries/hooks/useCreateExpense";
import { useDeleteExpense } from "src/queries/hooks/useDeleteExpense";
import { useUpdateExpense } from "src/queries/hooks/useUpdateExpense";
import { isNil } from "lodash";
import type { Moment } from "moment";
import { useCallback, useState } from "react";
import { CATEGORY, categoryGroupMap } from "src/constants/expense";
import type { Category } from "@features/Expense/types";

const initialAmount = 0;
const initialCategory = CATEGORY.Other;
const initialDate = null;
const initialDescription = "";

type Params = {
  editIndex?: number;
  onSubmit?: () => void;
};

export type TransactionInputInterface = {
  amount: number;
  setAmount: (value: number) => void;
  category: Category | null;
  setCategory: (value: Category) => void;
  date: Moment | null;
  setDate: (value: Moment | null) => void;
  description: string;
  setDescription: (value: string) => void;
  clear: () => void;
  create: () => void;
  remove: () => void;
  edit: () => void;
  disabledSubmit: boolean;
};

export const useTransactionInput = ({
  editIndex,
  onSubmit,
}: Params): TransactionInputInterface => {
  const { mutate: createExpense } = useCreateExpense();
  const { mutate: updateExpense } = useUpdateExpense();
  const { mutate: deleteExpense } = useDeleteExpense();

  const [amount, setAmount] = useState<number>(initialAmount);
  const [category, setCategory] = useState<Category>(initialCategory);
  const [date, setDate] = useState<Moment | null>(initialDate);
  const [description, setDescription] = useState(initialDescription);

  const disabledSubmit = isNil(amount) || !category || !date;

  const clear = useCallback(() => {
    setAmount(initialAmount);
    setCategory(initialCategory);
    setDate(initialDate);
    setDescription(initialDescription);
  }, []);

  const create = useCallback(async () => {
    try {
      if (disabledSubmit) throw new Error("Invalid input");

      await createExpense({
        date,
        category: categoryGroupMap[category],
        item: category,
        amount,
        remark: description,
      });
      onSubmit?.();
    } catch (err: any) {
      console.error(err);
      alert("Failed to create expense. Please try again.");
    }
  }, [
    amount,
    category,
    createExpense,
    date,
    description,
    disabledSubmit,
    onSubmit,
  ]);

  const edit = useCallback(async () => {
    try {
      if (disabledSubmit || isNil(editIndex)) throw new Error("Invalid input");

      await updateExpense({
        index: editIndex,
        date,
        category: categoryGroupMap[category],
        item: category,
        amount,
        remark: description,
      });
      onSubmit?.();
    } catch (err: any) {
      console.error(err);
      alert("Failed to edit expense. Please try again.");
    }
  }, [
    amount,
    category,
    date,
    description,
    disabledSubmit,
    editIndex,
    onSubmit,
    updateExpense,
  ]);

  const remove = useCallback(async () => {
    try {
      if (disabledSubmit || isNil(editIndex)) throw new Error("Invalid input");

      await deleteExpense(editIndex);
      onSubmit?.();
    } catch (err: any) {
      console.error(err);
      alert("Failed to remove expense. Please try again.");
    }
  }, [deleteExpense, disabledSubmit, editIndex, onSubmit]);

  return {
    amount,
    setAmount,
    category,
    setCategory,
    date,
    description,
    setDate,
    setDescription,
    clear,
    create,
    edit,
    remove,
    disabledSubmit,
  };
};
