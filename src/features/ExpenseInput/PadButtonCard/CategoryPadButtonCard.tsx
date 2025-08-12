import { Button, Icon } from "@components";
import type { IconProps } from "@components/Icon";
import { PadButtonCard } from "@features/ExpenseInput/PadButtonCard/PadButtonCard";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  icon?: IconProps["name"];
  isSelected?: boolean;
} & ComponentProps<typeof Button>;

export const CategoryPadButtonCard = ({
  icon,
  isSelected = false,
  children,
  className,
  ...otherProps
}: Props) => (
  <PadButtonCard
    className={twMerge(
      "px-0 text-sm font-semibold box-border border-2 border-transparent",
      isSelected && "border-blue-500",
      className
    )}
    {...otherProps}
  >
    {icon && (
      <>
        <Icon name={icon} className="text-2xl mb-1" />
        <br />
      </>
    )}
    <span className="px-1.5 line-clamp-2">{children}</span>
  </PadButtonCard>
);
