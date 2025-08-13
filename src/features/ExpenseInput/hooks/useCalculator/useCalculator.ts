import type {
  CalculatorInterface,
  CalculatorOpKey,
  CalculatorKey,
} from "./types";
import { defaultInitialValue, operatorRegex } from "./constants";
import {
  sanitize,
  isOperatorExist,
  isEndWithOperator,
  isEndWithDecimal,
  delLastChar,
  isDecimal,
  replaceSubValue,
  roundTo,
  getDecimalPlaces,
} from "./helpers";
import { useCallback, useEffect, useMemo, useState } from "react";

type Params = {
  onChange?: (value: number) => void;
};

export const useCalculator = ({ onChange }: Params): CalculatorInterface => {
  const [displayValue, setDisplayValue] = useState(
    defaultInitialValue.toLocaleString()
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

        return updatedFocusValue || defaultInitialValue.toLocaleString();
      }),
    [focusValue, hasOperator]
  );

  const clear = useCallback(() => setDisplayValue("0"), []);

  const calculate = useCallback(() => {
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

  const setCalculatorValue = useCallback(
    (value: number) => setDisplayValue(value.toLocaleString()),
    []
  );

  useEffect(() => {
    // Always non-negative
    if (value < 0) {
      clear();
    }
  }, [clear, value]);

  useEffect(() => {
    onChange?.(value);
  }, [value, onChange]);

  return {
    input,
    clear,
    del,
    calculate,
    setCalculatorValue,
    value,
    displayValue,
    isError,
    isCalculable: hasOperator,
    disableInput,
  };
};
