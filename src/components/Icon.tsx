import type { DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

export type IconProps = { name: string } & DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export const Icon = ({ name, className, ...spanProps }: IconProps) => (
  <span className={twMerge("-mb-[2px]", name, className)} {...spanProps}></span>
);
