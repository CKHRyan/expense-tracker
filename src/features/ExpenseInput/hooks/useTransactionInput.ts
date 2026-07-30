import { useCreateExpense } from "src/queries/hooks/useCreateExpense";
import { useDeleteExpense } from "src/queries/hooks/useDeleteExpense";
import { useUpdateExpense } from "src/queries/hooks/useUpdateExpense";
import { isNil } from "lodash";
import type { Moment } from "moment";
import { useCallback, useState } from "react";
import { CATEGORY, categoryGroupMap } from "src/constants/expense";
import type { Category } from "@features/Expense/types";
import { useConfirmModal } from "@components/Modal/ConfirmModal/useConfirmModal";
import { useTranslation } from "react-i18next";

const initialAmount = 0;
const initialCategory = CATEGORY.Other;
const initialDate = null;
const initialPayer = null;
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
  payer: string | null;
  setPayer: (value: string | null) => void;
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
  const [category, setCategory] = useState<Category>(initialCategory);
  const [date, setDate] = useState<Moment | null>(initialDate);
  const [payer, setPayer] = useState<string | null>(initialPayer);
  const [description, setDescription] = useState(initialDescription);

  const { t } = useTranslation();
  const { confirm } = useConfirmModal();

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
    confirm,
    createExpense,
    date,
    description,
    disabledSubmit,
    onSubmit,
    t,
  ]);

  const edit = useCallback(async () => {
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
        remark: description,
      });
      onSubmit?.();
    } catch (err: any) {
      console.error(err);
      alert("Failed to edit expense. Please try again.");
    }
  }, [
    disabledSubmit,
    editIndex,
    confirm,
    t,
    updateExpense,
    date,
    category,
    amount,
    description,
    onSubmit,
  ]);

  const remove = useCallback(async () => {
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
  }, [confirm, deleteExpense, disabledSubmit, editIndex, onSubmit, t]);

  return {
    amount,
    setAmount,
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
