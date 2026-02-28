import { Icon, type IconProps } from "@components/Icon";
import { Text } from "@components/Text";
import { useCallback } from "react";
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

  const onClick = useCallback(() => {
    if (!href) return;
    navigate(href);
  }, [href, navigate]);

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
