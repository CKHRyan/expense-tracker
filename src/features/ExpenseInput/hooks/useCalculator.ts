import { useCallback, useEffect, useMemo, useState } from "react";

export type CalculatorDigitKey =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

export type CalculatorDecimalKey = ".";

export type CalculatorOpKey = "×" | "+" | "÷";

type CalculatorKey =
  | CalculatorDigitKey
  | CalculatorDecimalKey
  | CalculatorOpKey;

export type CalculatorValue = {
  value: number;
  displayValue: string;
};

export type CalculatorStatus = {
  isError: boolean;
  isCalculable: boolean;
  disableInput: boolean;
};

export type CalculatorFunc = {
  input: (key: CalculatorKey) => void;
  clear: () => void;
  del: () => void;
  calculate: () => void;
};

export type CalculatorInterface = CalculatorValue &
  CalculatorStatus &
  CalculatorFunc;

const initializedValue = 0;

const sanitize = (value: string) => value.replaceAll(",", "");

const getLastChar = (str: string) => str.charAt(str.length - 1);

const delLastChar = (str: string) => str.slice(0, -1);

const operatorRegex = /([×+÷])/;

const isOperatorExist = (str: string) => operatorRegex.test(str);

const isEndWithOperator = (str: string) => isOperatorExist(getLastChar(str));

const isEndWithDecimal = (str: string) => getLastChar(str) === ".";

const isDecimal = (value: string) => value.includes(".");

const getDecimalPlaces = (value: string) => {
  const decimalSymbolIndex = value.indexOf(".");
  const isDecimal = decimalSymbolIndex >= 0;
  const decimalPlaces = isDecimal ? value.length - 1 - decimalSymbolIndex : 0;
  return decimalPlaces;
};

const roundTo = (n: number, digits: number) => {
  if (digits === undefined) {
    digits = 0;
  }
  const multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  const test = Math.round(n) / multiplicator;
  return +test.toFixed(digits);
};

const replaceSubValue = (str: string, updatedSubValue: string) => {
  if (!isOperatorExist(str)) throw new Error("Sub value doesnot exist.");

  const prefix = str.slice(0, str.search(operatorRegex) + 1);
  return `${prefix}${updatedSubValue}`;
};

export const useCalculator = (): CalculatorInterface => {
  const [displayValue, setDisplayValue] = useState(
    initializedValue.toLocaleString()
  );

  const [mainValue, focusValue, operator] = useMemo(() => {
    const [mainValue, operator, subValue] = displayValue
      .split(operatorRegex)
      .map(sanitize);
    return [mainValue, subValue ?? mainValue, operator];
  }, [displayValue]);

  const value = Number(mainValue);

  const isError = isNaN(value);

  const hasOperator = isOperatorExist(displayValue);

  const disableInput = displayValue.length > 20;

  const del = useCallback(
    () =>
      setDisplayValue((_displayValue) => {
        if (
          isEndWithOperator(_displayValue) ||
          isEndWithDecimal(_displayValue)
        ) {
          return delLastChar(_displayValue);
        }

        let updatedFocusValue = delLastChar(focusValue);

        if (updatedFocusValue) {
          if (!isDecimal(updatedFocusValue)) {
            updatedFocusValue = Number(updatedFocusValue).toLocaleString();
          } else {
            const [int, dec] = updatedFocusValue.split(".");
            updatedFocusValue = `${Number(int).toLocaleString()}.${dec}`;
          }
        }

        if (hasOperator)
          return replaceSubValue(_displayValue, updatedFocusValue);

        return updatedFocusValue || initializedValue.toLocaleString();
      }),
    [focusValue, hasOperator]
  );

  const clear = useCallback(() => setDisplayValue("0"), []);

  const calculate = useCallback(() => {
    console.log(operator);
    if (!operator) return;
    if (!focusValue) return setDisplayValue(Number(mainValue).toLocaleString());
    let resultValue: number;
    switch (operator) {
      case "+":
        resultValue = Number(mainValue) + Number(focusValue);
        break;
      case "÷":
        resultValue = roundTo(Number(mainValue) / Number(focusValue), 2);
        break;
      case "×":
        resultValue = Number(mainValue) * Number(focusValue);
        break;
      default:
        resultValue = Number(mainValue);
    }
    setDisplayValue(Number(resultValue).toLocaleString());
  }, [focusValue, mainValue, operator]);

  const appendDigit = useCallback(
    (num: number) => {
      if (getDecimalPlaces(focusValue) >= 2) {
        return;
      }
      setDisplayValue((_displayValue) => {
        if (_displayValue === "0") {
          return num.toLocaleString();
        }
        let updatedFocusValue: string;
        if (!isDecimal(focusValue)) {
          updatedFocusValue = Number(`${focusValue}${num}`).toLocaleString();
        } else {
          const [int, dec] = focusValue.split(".");
          updatedFocusValue = `${Number(int).toLocaleString()}.${dec}${num}`;
        }
        if (hasOperator)
          return replaceSubValue(_displayValue, updatedFocusValue);
        return updatedFocusValue;
      });
    },
    [focusValue, hasOperator]
  );

  const appendDecimal = useCallback(() => {
    if (focusValue === "" || focusValue.includes(".")) return;
    setDisplayValue((_displayValue) => `${_displayValue}.`);
  }, [focusValue]);

  const appendOperator = useCallback(
    (op: CalculatorOpKey) => {
      if (hasOperator) {
        calculate();
      }
      setDisplayValue((_displayValue) => {
        const updatedValue = `${
          isEndWithOperator(_displayValue)
            ? delLastChar(_displayValue)
            : _displayValue
        }${op}`;
        return updatedValue;
      });
    },
    [calculate, hasOperator]
  );

  const input = useCallback(
    (key: CalculatorKey) => {
      if (disableInput) {
        return;
      }

      switch (key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          return appendDigit(Number(key));
        case ".":
          return appendDecimal();
        case "+":
        case "÷":
        case "×":
          return appendOperator(key);
      }
    },
    [appendDecimal, appendDigit, disableInput, appendOperator]
  );

  useEffect(() => {
    // Always non-negative
    if (value < 0) {
      clear();
    }
  }, [clear, value]);

  return {
    input,
    clear,
    del,
    calculate,
    value,
    displayValue,
    isError,
    isCalculable: hasOperator,
    disableInput,
  };
};
