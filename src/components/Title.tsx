import { twMerge } from "tailwind-merge";

type Props = {
  children: string;
  className?: string;
};

export const Title = ({ children, className }: Props) => (
  <h3
    className={twMerge(
      "text-3xl font-extrabold leading-none tracking-tight text-white",
      className
    )}
  >
    {children}
  </h3>
);
