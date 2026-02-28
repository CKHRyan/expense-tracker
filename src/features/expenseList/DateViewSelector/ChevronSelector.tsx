import { Icon, Text } from "@components";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children?: ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  className?: string;
  titleClassName?: string;
};

export const ChevronSelector = ({
  children,
  onLeftClick,
  onRightClick,
  className,
  titleClassName,
}: Props) => (
  <div className={twMerge("flex items-center gap-0", className)}>
    <Icon
      name="icon-[material-symbols--chevron-left-rounded]"
      onClick={onLeftClick}
      className="text-3xl"
    ></Icon>
    {typeof children === "string" || typeof children === "number" ? (
      <Text
        className={twMerge("text-xl font-bold text-center", titleClassName)}
      >
        {children}
      </Text>
    ) : (
      children
    )}
    <Icon
      name="icon-[material-symbols--chevron-right-rounded]"
      onClick={onRightClick}
      className="text-3xl"
    />
  </div>
);
