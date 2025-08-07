import { twMerge } from "tailwind-merge";

type Props = {
  children: string | string[];
  className?: string;
};

export const Text = ({ children, className }: Props) => (
  <h3 className={twMerge("text-base tracking-tight text-white", className)}>
    {children}
  </h3>
);
