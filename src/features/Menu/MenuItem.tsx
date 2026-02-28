import { Text } from "@components";
import { Icon, type IconProps } from "@components/Icon";
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type MenuItemProps = {
  title: string;
  icon?: IconProps["name"];
  content?: ReactNode;
  containerClassName?: string;
} & Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "children" | "content"
>;

export const MenuItem = ({
  title,
  icon,
  content,
  className,
  ...otherProps
}: MenuItemProps) => (
  <div
    className={twMerge(
      "p-4 flex gap-3 items-center",
      otherProps.onClick && "cursor-pointer",
      className,
    )}
    {...otherProps}
  >
    {icon && <Icon name={icon} className="text-3xl" />}
    <Text className="font-medium text-xl flex-1">{title}</Text>
    {content}
  </div>
);
