import { Button } from "@components";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const PadButtonCard = ({
  className,
  ...buttonProps
}: ComponentProps<typeof Button>) => (
  <button
    className={twMerge(
      "bg-zinc-700 rounded-md p-4 flex-1 items-center justify-center text-center cursor-pointer disabled:opacity-30",
      className,
    )}
    {...buttonProps}
  />
);
