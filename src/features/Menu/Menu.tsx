import { Divider } from "@components/Divider";
import { MenuItem, type MenuItemProps } from "@features/Menu/MenuItem";
import type { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";

export type MenuItemOption = Pick<
  MenuItemProps,
  "title" | "icon" | "onClick" | "isLocked" | "suffixComponent"
>;

type Props = {
  items: MenuItemOption[];
  headerDivider?: boolean;
  className?: string;
  menuItemClassName?: string;
  header?: ReactNode;
};

export const Menu = ({
  headerDivider,
  items,
  className,
  menuItemClassName,
  header,
}: Props) => (
  <div className={className}>
    {header}
    {headerDivider && items.length > 0 && <Divider />}
    {items.map((item, index) => (
      <Fragment key={`menu-item-${index}`}>
        <MenuItem className={menuItemClassName} {...item} />
        <Divider />
      </Fragment>
    ))}
  </div>
);
