import type { DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "solid" | "text";

export type ButtonProps = DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: ButtonVariant;
};

const variantClassNames: Record<ButtonVariant, string> = {
  solid:
    "px-5 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 active:ring-blue-600 rounded-lg ",
  text: "px-2.5 hover:opacity-70 focus:opacity-70 active:opacity-70",
};

export const Button = ({
  variant = "solid",
  className,
  ...buttonProps
}: ButtonProps) => (
  <button
    className={twMerge(
      "cursor-pointer text-white disabled:opacity-50 font-medium py-2.5 text-center",
      variantClassNames[variant],
      className
    )}
    type="button"
    {...buttonProps}
  />
);
