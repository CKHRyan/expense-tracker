import { ExpenseAttribute, ExpenseDataType, ExpenseSchema } from "./constants";

export type ExpenseAttributeValue =
  (typeof ExpenseAttribute)[keyof typeof ExpenseAttribute];

export type ExpenseDataTypeValue =
  (typeof ExpenseDataType)[keyof typeof ExpenseDataType];

export type ExpenseAttributeLabel =
  (typeof ExpenseSchema)[keyof typeof ExpenseSchema]["label"];

export type ExpenseDataTypeMap = {
  [ExpenseDataType.Date]: string;
  [ExpenseDataType.String]: string;
  [ExpenseDataType.Number]: number;
};

type ExpenseAttributeDataType<T extends ExpenseAttributeValue> =
  ExpenseDataTypeMap[(typeof ExpenseSchema)[T]["type"]];

export type ExpenseRecord = {
  [ExpenseAttribute.date]: ExpenseAttributeDataType<
    typeof ExpenseAttribute.date
  >;
  [ExpenseAttribute.category]: ExpenseAttributeDataType<
    typeof ExpenseAttribute.category
  >;
  [ExpenseAttribute.item]: ExpenseAttributeDataType<
    typeof ExpenseAttribute.item
  >;
  [ExpenseAttribute.amount]: ExpenseAttributeDataType<
    typeof ExpenseAttribute.amount
  >;
  [ExpenseAttribute.remark]: ExpenseAttributeDataType<
    typeof ExpenseAttribute.remark
  >;
};
