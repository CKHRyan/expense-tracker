import { Button, type ButtonProps } from "@components";
import { twMerge } from "tailwind-merge";

export type FabProps = ButtonProps;

export const Fab = ({ className, ...buttonProps }: FabProps) => (
  <div className="absolute z-90 bottom-6 inset-x-0 flex items-center justify-center">
    <Button
      className={twMerge(
        "bg-zinc-700 hover:bg-zinc-600 py-3 px-10 text-lg rounded-full duration-100 cursor-pointer",
        className
      )}
      {...buttonProps}
    />
  </div>
);
