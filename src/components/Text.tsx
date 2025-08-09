import { twMerge } from "tailwind-merge";

export type TextProps = {
  children: string | string[] | number;
  className?: string;
};

export const Text = ({ children, className }: TextProps) => (
  <h3 className={twMerge("text-base tracking-tight text-white", className)}>
    {children}
  </h3>
);
