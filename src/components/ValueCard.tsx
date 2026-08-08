import { Text } from "@components";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  value: string | number;
  className?: string;
  titleClassName?: string;
  valueClassName?: string;
  bgColor?: string;
  suffixComponent?: ReactNode;
};

export const ValueCard = ({
  title,
  value,
  className,
  titleClassName,
  valueClassName,
  bgColor = "#2c2c2c",
  suffixComponent,
}: Props) => (
  <div
    className={twMerge("flex flex-row items-center p-4 rounded-md", className)}
    style={{ backgroundColor: bgColor }}
  >
    <div className="flex-1">
      <Text className={titleClassName}>{title}</Text>
      <Text className={twMerge("text-lg font-extrabold", valueClassName)}>
        {value}
      </Text>
    </div>
    {suffixComponent}
  </div>
);
