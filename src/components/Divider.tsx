import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export const Divider = ({ className }: Props) => (
  <div className={twMerge("h-px bg-zinc-500", className)} />
);
