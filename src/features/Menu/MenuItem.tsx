import { Text } from "@components";
import { Icon, type IconProps } from "@components/Icon";
import { AuthLockChip } from "@features/Menu/AuthLockChip";
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type MenuItemProps = {
  title: string;
  icon?: IconProps["name"];
  suffixComponent?: ReactNode;
  content?: ReactNode;
  containerClassName?: string;
  isLocked?: boolean;
} & Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "children" | "content"
>;

export const MenuItem = ({
  title,
  icon,
  content,
  className,
  isLocked,
  suffixComponent,
  onClick,
  ...otherProps
}: MenuItemProps) => (
  <div
    onClick={!isLocked ? onClick : undefined}
    className={twMerge(
      "p-4 flex gap-3 items-center",
      onClick && !isLocked && "cursor-pointer",
      isLocked && "opacity-50",
      className,
    )}
    {...otherProps}
  >
    <div className="flex gap-3 flex-1 items-center">
      {icon && <Icon name={icon} className="text-3xl" />}
      <Text className="font-medium text-xl">{title}</Text>
      {suffixComponent}
      {isLocked && <AuthLockChip />}
    </div>
    {content}
  </div>
);
