import moment from "moment";
import type { Entries } from "../types";
import {
  serverDatetimeFormat,
  ExpenseDataType,
  ExpenseSchema,
} from "./constants";
import type {
  ExpenseAttributeLabel,
  ExpenseAttributeValue,
  ExpenseRecord,
} from "./types";
import type { GoogleSpreadsheetRow } from "google-spreadsheet";
import { isObject } from "lodash";

export const facadeSheetExpenseRow = (
  row: GoogleSpreadsheetRow<Record<string, any>>
): Record<ExpenseAttributeValue, string> =>
  (Object.entries(ExpenseSchema) as Entries<typeof ExpenseSchema>).reduce(
    (record, [key, value]) => ({
      ...record,
      [key]: row.get(value.label),
    }),
    {} as Record<ExpenseAttributeValue, string>
  );

export const facadeExpenseRowToSheetRecord = (
  record: ExpenseRecord
): Record<ExpenseAttributeLabel, string> =>
  (Object.entries(record) as Entries<ExpenseRecord>).reduce(
    (record, [key, value]) => ({
      ...record,
      [ExpenseSchema[key].label]: value.toString(),
    }),
    {} as Record<ExpenseAttributeLabel, string>
  );

export const facadeRawExpenseRecord = (
  rawRecord: Record<ExpenseAttributeValue, string>
): ExpenseRecord =>
  (
    Object.entries(rawRecord) as Entries<Record<ExpenseAttributeValue, string>>
  ).reduce((record, [key, value]) => {
    const mergedRecord = (value: any) => ({
      ...record,
      [key]: value,
    });
    const { type } = ExpenseSchema[key];
    switch (type) {
      case ExpenseDataType.Date:
        return mergedRecord(moment(value).format(serverDatetimeFormat));
      case ExpenseDataType.Number: {
        const _value = Number(value.replace("$", ""));
        return mergedRecord(!isNaN(_value) ? _value : -999);
      }
      case ExpenseDataType.String:
      default:
        return mergedRecord(value);
    }
  }, {} as ExpenseRecord);

const isExpenseSchemaKey = (key: string): key is keyof typeof ExpenseSchema =>
  key in ExpenseSchema;

export const isValidExpenseRecord = (record: any): record is ExpenseRecord => {
  if (!isObject(record)) return false;
  return Object.entries(record).every(([key, value]) => {
    if (!isExpenseSchemaKey(key)) return false;
    const { type } = ExpenseSchema[key];
    switch (type) {
      case ExpenseDataType.Date:
        return moment(value).isValid();
      case ExpenseDataType.Number:
        return typeof value === "number";
      case ExpenseDataType.String:
      default:
        return typeof value === "string";
    }
  });
};
