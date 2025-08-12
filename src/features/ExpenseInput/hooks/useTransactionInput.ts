import { isNil } from "lodash";
import type { Moment } from "moment";
import { useCallback, useState } from "react";
import { category } from "src/constants/expense";
import type { Category } from "src/types/expense";

const initialAmount = 0;
const initialCategory = category.Other;
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

  const submit = useCallback(() => {
    console.log(amount, category, date, description);
  }, [amount, category, date, description]);

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
