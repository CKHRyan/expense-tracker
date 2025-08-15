import { Text } from "@components";
import { Icon, type IconProps } from "@components/Icon";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type MenuItemProps = {
  title: string;
  icon?: IconProps["name"];
  containerClassName?: string;
} & Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "children"
>;

export const MenuItem = ({
  title,
  icon,
  className,
  ...otherProps
}: MenuItemProps) => {
  return (
    <div
      className={twMerge("p-4 flex gap-2 items-center", className)}
      {...otherProps}
    >
      {icon && <Icon name={icon} className="text-3xl" />}
      <Text className="font-medium text-xl">{title}</Text>
    </div>
  );
};
