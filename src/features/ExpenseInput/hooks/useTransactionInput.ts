import { useCreateExpense } from "src/queries/hooks/useCreateExpense";
import { useDeleteExpense } from "src/queries/hooks/useDeleteExpense";
import { useUpdateExpense } from "src/queries/hooks/useUpdateExpense";
import { isNil } from "lodash";
import type { Moment } from "moment";
import { useState } from "react";
import { CATEGORY, categoryGroupMap } from "src/constants/expense";
import type { Category } from "@features/Expense/types";
import { useConfirmModal } from "@components/Modal/ConfirmModal/useConfirmModal";
import { useTranslation } from "react-i18next";
import { SHARED_PAYER_KEY } from "src/features/Payer/constants";
import { DEFAULT_CURRENCY } from "src/features/Currency/constants";

const initialAmount = 0;
const initialCurrency = DEFAULT_CURRENCY.unit;
const initialCategory = CATEGORY.Other;
const initialDate = null;
const initialPayer = SHARED_PAYER_KEY;
const initialDescription = "";

type Params = {
  editIndex?: number;
  onSubmit?: () => void;
};

export type TransactionInputInterface = {
  amount: number;
  setAmount: (value: number) => void;
  currency: string;
  setCurrency: (value: string) => void;
  category: Category | null;
  setCategory: (value: Category) => void;
  date: Moment | null;
  setDate: (value: Moment | null) => void;
  payer: string;
  setPayer: (value: string) => void;
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
  const { mutateAsync: createExpense } = useCreateExpense();
  const { mutateAsync: updateExpense } = useUpdateExpense();
  const { mutateAsync: deleteExpense } = useDeleteExpense();

  const [amount, setAmount] = useState<number>(initialAmount);
  const [currency, setCurrency] = useState<string>(initialCurrency);
  const [category, setCategory] = useState<Category>(initialCategory);
  const [date, setDate] = useState<Moment | null>(initialDate);
  const [payer, setPayer] = useState<string>(initialPayer);
  const [description, setDescription] = useState(initialDescription);

  const { t } = useTranslation();
  const { confirm } = useConfirmModal();

  const disabledSubmit = isNil(amount) || !category || !date;

  const clear = () => {
    setAmount(initialAmount);
    setCategory(initialCategory);
    setDate(initialDate);
    setDescription(initialDescription);
  };

  const create = async () => {
    try {
      if (disabledSubmit) throw new Error("Invalid input");

      const isConfirmed = await confirm({
        title: t("expenseInput.addSpending"),
        description: t("expenseInput.addSpending.prompt"),
      });
      if (!isConfirmed) return;

      await createExpense({
        date,
        category: categoryGroupMap[category],
        item: category,
        amount,
        currency,
        payer,
        remark: description,
      });
      onSubmit?.();
    } catch (err: any) {
      console.error(err);
      alert("Failed to create expense. Please try again.");
    }
  };

  const edit = async () => {
    try {
      if (disabledSubmit || isNil(editIndex)) throw new Error("Invalid input");

      const isConfirmed = await confirm({
        title: t("expenseInput.editSpending"),
        description: t("expenseInput.editSpending.prompt"),
      });
      if (!isConfirmed) return;

      await updateExpense({
        index: editIndex,
        date,
        category: categoryGroupMap[category],
        item: category,
        amount,
        currency,
        payer,
        remark: description,
      });
      onSubmit?.();
    } catch (err: any) {
      console.error(err);
      alert("Failed to edit expense. Please try again.");
    }
  };

  const remove = async () => {
    try {
      if (disabledSubmit || isNil(editIndex)) throw new Error("Invalid input");

      const isConfirmed = await confirm({
        title: t("expenseInput.removeSpending"),
        description: t("expenseInput.removeSpending.prompt"),
      });
      if (!isConfirmed) return;

      await deleteExpense(editIndex);
      onSubmit?.();
    } catch (err: any) {
      console.error(err);
      alert("Failed to remove expense. Please try again.");
    }
  };

  return {
    amount,
    setAmount,
    currency,
    setCurrency,
    category,
    setCategory,
    date,
    description,
    setDate,
    setDescription,
    payer,
    setPayer,
    clear,
    create,
    edit,
    remove,
    disabledSubmit,
  };
};
