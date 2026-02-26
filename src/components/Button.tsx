import type { DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "solid" | "text";

type ButtonColorVariant = "primary" | "secondary" | "warning";

export type ButtonProps = DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: ButtonVariant;
  colorVariant?: ButtonColorVariant;
};

const variantClassNames: Record<ButtonVariant, string> = {
  solid: "px-5 focus:ring-4 focus:outline-none rounded-lg",
  text: "px-2.5 hover:opacity-70 focus:opacity-70 active:opacity-70",
};

const colorVariantClassNames: Partial<
  Record<ButtonVariant, Record<ButtonColorVariant, string>>
> = {
  solid: {
    primary:
      "bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 active:ring-blue-600",
    secondary:
      "bg-zinc-700 hover:bg-zinc-800 focus:ring-zinc-500 active:ring-zinc-800",
    warning:
      "bg-amber-500 hover:bg-amber-600 focus:ring-amber-300 active:ring-amber-600",
  },
};

export const Button = ({
  variant = "solid",
  colorVariant = "primary",
  className,
  ...buttonProps
}: ButtonProps) => (
  <button
    className={twMerge(
      "cursor-pointer text-white disabled:opacity-50 font-medium py-2.5 text-center",
      variantClassNames[variant],
      colorVariantClassNames[variant]?.[colorVariant],
      className,
    )}
    type="button"
    {...buttonProps}
  />
);
