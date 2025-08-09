import type { DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonProps = DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ className, ...buttonProps }: ButtonProps) => (
  <button
    className={twMerge(
      "cursor-pointer text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 active:ring-blue-600 font-medium rounded-lg px-5 py-2.5 text-center",
      className
    )}
    type="button"
    {...buttonProps}
  />
);
