import type { Moment } from "moment";
import { useCallback, useState } from "react";

export type TransactionInputInterface = {
  date: Moment | null;
  setDate: (value: Moment) => void;
  description: string;
  setDescription: (value: string) => void;
  clear: () => void;
};

export const useTransactionInput = (): TransactionInputInterface => {
  const [date, setDate] = useState<Moment | null>(null);
  const [description, setDescription] = useState("");

  const clear = useCallback(() => {
    setDate(null);
    setDescription("");
  }, []);

  return { date, description, setDate, setDescription, clear };
};
