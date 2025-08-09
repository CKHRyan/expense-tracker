import { Text } from "@components";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  value: string | number;
  className?: string;
  titleClassName?: string;
  valueClassName?: string;
  bgColor?: string;
};

export const ValueCard = ({
  title,
  value,
  className,
  titleClassName,
  valueClassName,
  bgColor = "#2c2c2c",
}: Props) => (
  <div
    className={twMerge("p-4 rounded-md", className)}
    style={{ backgroundColor: bgColor }}
  >
    <Text className={titleClassName}>{title}</Text>
    <Text className={twMerge("text-lg font-extrabold", valueClassName)}>
      {value}
    </Text>
  </div>
);
