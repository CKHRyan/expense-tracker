import { Button, Icon } from "@components";
import type { IconProps } from "@components/Icon";
import { PadButtonCard } from "@features/ExpenseInput/PadButtonCard/PadButtonCard";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  icon?: IconProps["name"];
} & Pick<ComponentProps<typeof Button>, "children" | "className">;

export const CategoryPadButtonCard = ({ icon, children, className }: Props) => (
  <PadButtonCard className={twMerge("px-0 text-sm font-semibold", className)}>
    {icon && (
      <>
        <Icon name={icon} className="text-2xl mb-1" />
        <br />
      </>
    )}
    <span className="px-1.5 line-clamp-2">{children}</span>
  </PadButtonCard>
);
