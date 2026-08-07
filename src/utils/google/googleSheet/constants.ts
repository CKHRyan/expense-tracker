export const ExpenseAttribute = {
  date: "date",
  category: "category",
  item: "item",
  amount: "amount",
  currency: "currency",
  payer: "payer",
  remark: "remark",
} as const;

export const ExpenseDataType = {
  Date: "date",
  String: "string",
  Number: "number",
} as const;

export const ExpenseSchema = {
  [ExpenseAttribute.date]: {
    label: "Date",
    type: ExpenseDataType.Date,
  },
  [ExpenseAttribute.category]: {
    label: "Category",
    type: ExpenseDataType.String,
  },
  [ExpenseAttribute.item]: {
    label: "Item",
    type: ExpenseDataType.String,
  },
  [ExpenseAttribute.amount]: {
    label: "Amount",
    type: ExpenseDataType.Number,
  },
  [ExpenseAttribute.currency]: {
    label: "Currency",
    type: ExpenseDataType.String,
  },
  [ExpenseAttribute.payer]: {
    label: "Payer",
    type: ExpenseDataType.String,
  },
  [ExpenseAttribute.remark]: {
    label: "Remark",
    type: ExpenseDataType.String,
  },
} as const;

export const displayDateFormat = "YYYY-MM-DD";

export const serverDateFormat = "MM/DD/YYYY";

export const serverDatetimeFormat = `${serverDateFormat} HH:mm:ss`;
