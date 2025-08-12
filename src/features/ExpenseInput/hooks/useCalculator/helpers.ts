import { operatorRegex } from "./constants";

export const sanitize = (value: string) => value.replaceAll(",", "");

export const getLastChar = (str: string) => str.charAt(str.length - 1);

export const delLastChar = (str: string) => str.slice(0, -1);

export const isOperatorExist = (str: string) => operatorRegex.test(str);

export const isEndWithOperator = (str: string) =>
  isOperatorExist(getLastChar(str));

export const isEndWithDecimal = (str: string) => getLastChar(str) === ".";

export const isDecimal = (value: string) => value.includes(".");

export const getDecimalPlaces = (value: string) => {
  const decimalSymbolIndex = value.indexOf(".");
  const isDecimal = decimalSymbolIndex >= 0;
  const decimalPlaces = isDecimal ? value.length - 1 - decimalSymbolIndex : 0;
  return decimalPlaces;
};

export const roundTo = (n: number, digits: number) => {
  if (digits === undefined) {
    digits = 0;
  }
  const multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  const test = Math.round(n) / multiplicator;
  return +test.toFixed(digits);
};

export const replaceSubValue = (str: string, updatedSubValue: string) => {
  if (!isOperatorExist(str)) throw new Error("Sub value doesnot exist.");

  const prefix = str.slice(0, str.search(operatorRegex) + 1);
  return `${prefix}${updatedSubValue}`;
};
