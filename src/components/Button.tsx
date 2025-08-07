import type { DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ className, ...buttonProps }: Props) => (
  <button
    className={twMerge(
      "cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 active:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
      className
    )}
    type="button"
    {...buttonProps}
  />
);
