import moment, { type Moment } from "moment";
import type { Entries } from "../types";
import {
  serverDatetimeFormat,
  ExpenseDataType,
  ExpenseSchema,
} from "./constants";
import type {
  ExpenseAttributeLabel,
  ExpenseAttributeValue,
  RawExpenseRecord,
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

export const facadeRawExpenseRowToSheetRecord = (
  record: RawExpenseRecord
): Record<ExpenseAttributeLabel, string> =>
  (Object.entries(record) as Entries<RawExpenseRecord>).reduce(
    (record, [key, value]) => ({
      ...record,
      [ExpenseSchema[key].label]: value.toString(),
    }),
    {} as Record<ExpenseAttributeLabel, string>
  );

export const facadeSheetRawExpenseRecord = (
  rawRecord: Record<ExpenseAttributeValue, string>
): RawExpenseRecord =>
  (
    Object.entries(rawRecord) as Entries<
      Record<ExpenseAttributeValue, string | undefined>
    >
  ).reduce((record, [key, value]) => {
    const mergedRecord = (value: any) => ({
      ...record,
      [key]: value,
    });
    const valStr = value ?? "";
    const { type } = ExpenseSchema[key];
    let dateMoment: Moment;
    switch (type) {
      case ExpenseDataType.Date:
        dateMoment = moment(valStr, serverDatetimeFormat);
        return dateMoment.isValid()
          ? mergedRecord(dateMoment.format(serverDatetimeFormat))
          : record;
      case ExpenseDataType.Number: {
        const _value = Number(valStr.replace("$", ""));
        return mergedRecord(!isNaN(_value) ? _value : -999);
      }
      case ExpenseDataType.String:
      default:
        return mergedRecord(valStr);
    }
  }, {} as RawExpenseRecord);

const isExpenseSchemaKey = (key: string): key is keyof typeof ExpenseSchema =>
  key in ExpenseSchema;

export const isValidRawExpenseRecord = (
  record: any
): record is RawExpenseRecord => {
  if (!isObject(record)) return false;
  return Object.entries(record).every(([key, value]) => {
    if (!isExpenseSchemaKey(key)) return true;
    const { type } = ExpenseSchema[key];
    switch (type) {
      case ExpenseDataType.Date:
        return moment(value, serverDatetimeFormat).isValid();
      case ExpenseDataType.Number:
        return typeof value === "number";
      case ExpenseDataType.String:
      default:
        return typeof value === "string";
    }
  });
};
