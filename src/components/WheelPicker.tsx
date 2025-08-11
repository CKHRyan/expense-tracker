import "@ncdai/react-wheel-picker/style.css";

import * as WheelPickerPrimitive from "@ncdai/react-wheel-picker";

import { cn } from "@utils/cnHelper";
import { twMerge } from "tailwind-merge";

export type WheelPickerOption = WheelPickerPrimitive.WheelPickerOption;
export type WheelPickerClassNames = WheelPickerPrimitive.WheelPickerClassNames;

export const WheelPickerWrapper = ({
  className,
  ...props
}: React.ComponentProps<typeof WheelPickerPrimitive.WheelPickerWrapper>) => (
  <WheelPickerPrimitive.WheelPickerWrapper
    className={cn(
      "w-56 rounded-lg bg-[#242420] px-1 shadow-xs",
      "*:data-rwp:first:*:data-rwp-highlight-wrapper:rounded-s-md",
      "*:data-rwp:last:*:data-rwp-highlight-wrapper:rounded-e-md",
      className
    )}
    {...props}
  />
);

export const WheelPicker = ({
  classNames,
  ...props
}: React.ComponentProps<typeof WheelPickerPrimitive.WheelPicker>) => (
  <WheelPickerPrimitive.WheelPicker
    classNames={{
      optionItem: twMerge(
        "text-zinc-400 dark:text-zinc-500 text-lg!",
        classNames?.optionItem
      ),
      highlightWrapper: twMerge(
        "bg-zinc-700 text-white",
        classNames?.highlightWrapper
      ),
      highlightItem: twMerge("text-xl", classNames?.highlightItem),
    }}
    optionItemHeight={36}
    {...props}
  />
);
