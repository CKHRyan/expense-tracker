import type { DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = { name: string } & DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export const Icon = ({ name, className, ...spanProps }: Props) => (
  <span className={twMerge(name, className)} {...spanProps}></span>
);
