import { useExpenseMutation } from "@hooks/useExpenseMutation";
import { useAppStore } from "@stores";
import { isNil } from "lodash";
import type { Moment } from "moment";
import { useCallback, useState } from "react";
import { CATEGORY, categoryGroupMap } from "src/constants/expense";
import type { Category } from "src/types/expense";

const initialAmount = 0;
const initialCategory = CATEGORY.Other;
const initialDate = null;
const initialDescription = "";

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
  submit: () => void;
  disabledSubmit: boolean;
};

export const useTransactionInput = (): TransactionInputInterface => {
  const { createExpense } = useExpenseMutation();
  const { setIsOpenExpenseSheet } = useAppStore();

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

  const submit = useCallback(async () => {
    try {
      if (disabledSubmit) throw new Error("Invalid input");

      await createExpense({
        date,
        category: categoryGroupMap[category],
        item: category,
        amount,
        remark: description,
      });
      setIsOpenExpenseSheet(false);
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
    setIsOpenExpenseSheet,
  ]);

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
    submit,
    disabledSubmit,
  };
};
