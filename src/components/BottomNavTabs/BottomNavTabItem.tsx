import { Icon, type IconProps } from "@components/Icon";
import { Text } from "@components/Text";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

export type BottomNavTabItemProps = {
  icon: IconProps["name"];
  title: string;
  href?: string;
  className?: string;
  titleClassName?: string;
  iconClassName?: string;
};

export const BottomNavTabItem = ({
  icon,
  title,
  href,
  className,
  titleClassName,
  iconClassName,
}: BottomNavTabItemProps) => {
  const navigate = useNavigate();

  const onClick = () => {
    if (!href) return;
    navigate(href);
  };

  return (
    <div
      onClick={onClick}
      className={twMerge("text-center", href && "cursor-pointer", className)}
    >
      <Icon name={icon} className={twMerge("text-2xl", iconClassName)} />
      <Text className={twMerge("font-semibold", titleClassName)}>{title}</Text>
    </div>
  );
};
