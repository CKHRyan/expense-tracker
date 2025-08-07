import { PadButtonCard } from "@/features/expenseList/PadButtonCard";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type Operator = "×" | "+" | "-";

type Props = {
  onChange: (value: number) => void;
  className?: string;
};

export const TxnAmountPad = ({ onChange, className }: Props) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [currentNumber, setCurrentNumber] = useState("");
  const [operator, setOperator] = useState<Operator | null>(null);
  const [previousNumber, setPreviousNumber] = useState("");

  const appendDigit = (digit: number) => {
    if (currentNumber.length >= 10) return; // Limit input length
    if (currentNumber === "0" && digit === 0) return; // Prevent multiple leading zeros

    const newNumber =
      currentNumber === "0" ? digit.toString() : currentNumber + digit;
    setCurrentNumber(newNumber);
    setDisplayValue(newNumber);
    onChange?.(parseFloat(newNumber));
  };

  const appendDecimal = () => {
    if (currentNumber.includes(".")) return; // Prevent multiple decimals
    const newNumber = currentNumber === "" ? "0." : currentNumber + ".";
    setCurrentNumber(newNumber);
    setDisplayValue(newNumber);
  };

  const del = () => {
    if (currentNumber.length === 0) return;
    const newNumber = currentNumber.slice(0, -1);
    setCurrentNumber(newNumber);
    setDisplayValue(newNumber || "0");
    onChange?.(newNumber ? parseFloat(newNumber) : 0);
  };

  const clear = () => {
    setCurrentNumber("");
    setDisplayValue("0");
    setOperator(null);
    setPreviousNumber("");
    onChange?.(0);
  };

  const calculate = () => {
    if (!previousNumber || !currentNumber || !operator) return;

    const prev = parseFloat(previousNumber);
    const curr = parseFloat(currentNumber);
    let result = 0;

    switch (operator) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "×":
        result = prev * curr;
        break;
      default:
        return;
    }

    const formattedResult = result.toString();
    setCurrentNumber(formattedResult);
    setDisplayValue(formattedResult);
    setPreviousNumber("");
    setOperator(null);
    onChange?.(result);
  };

  const operatorHandler = (op: Operator) => {
    if (currentNumber === "") return;

    if (previousNumber && operator) {
      calculate();
      setPreviousNumber(currentNumber);
      setCurrentNumber("");
      setOperator(op);
    } else {
      setPreviousNumber(currentNumber);
      setCurrentNumber("");
      setOperator(op);
    }
  };

  return (
    <div>
      <div>{displayValue}</div>
      <div className={twMerge("flex flex-col gap-2", className)}>
        <div className="flex gap-2">
          <PadButtonCard onClick={() => appendDigit(1)}>1</PadButtonCard>
          <PadButtonCard onClick={() => appendDigit(2)}>2</PadButtonCard>
          <PadButtonCard onClick={() => appendDigit(3)}>3</PadButtonCard>
          <PadButtonCard onClick={() => operatorHandler("×")}>×</PadButtonCard>
        </div>
        <div className="flex gap-2">
          <PadButtonCard onClick={() => appendDigit(4)}>4</PadButtonCard>
          <PadButtonCard onClick={() => appendDigit(5)}>5</PadButtonCard>
          <PadButtonCard onClick={() => appendDigit(6)}>6</PadButtonCard>
          <PadButtonCard onClick={() => operatorHandler("+")}>+</PadButtonCard>
        </div>
        <div className="flex gap-2">
          <PadButtonCard onClick={() => appendDigit(7)}>7</PadButtonCard>
          <PadButtonCard onClick={() => appendDigit(8)}>8</PadButtonCard>
          <PadButtonCard onClick={() => appendDigit(9)}>9</PadButtonCard>
          <PadButtonCard onClick={() => operatorHandler("-")}>-</PadButtonCard>
        </div>
        <div className="flex gap-2">
          <PadButtonCard onClick={appendDecimal}>.</PadButtonCard>
          <PadButtonCard onClick={() => appendDigit(0)}>0</PadButtonCard>
          <PadButtonCard onClick={del}>Del</PadButtonCard>
          <PadButtonCard onClick={clear}>AC</PadButtonCard>
        </div>
      </div>
    </div>
  );
};
