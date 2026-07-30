import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const ListItemCard = ({ className, ...otherProps }: Props) => (
  <div
    className={twMerge(
      "px-3 py-2 bg-[#2c2c2c] flex gap-4 rounded-md items-center",
      otherProps.onClick && "cursor-pointer",
      className,
    )}
    {...otherProps}
  />
);
