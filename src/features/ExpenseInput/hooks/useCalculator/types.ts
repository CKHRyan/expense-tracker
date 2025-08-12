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

export type CalculatorKey =
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
