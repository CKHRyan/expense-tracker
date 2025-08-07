export const ExpenseAttribute = {
  date: "date",
  category: "category",
  item: "item",
  amount: "amount",
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
  [ExpenseAttribute.remark]: {
    label: "Remark",
    type: ExpenseDataType.String,
  },
} as const;

export const displayDateFormat = "YYYY-MM-DD";

export const serverDateFormat = "MM/DD/YYYY";

export const serverDatetimeFormat = `${serverDateFormat} HH:mm:ss`;
