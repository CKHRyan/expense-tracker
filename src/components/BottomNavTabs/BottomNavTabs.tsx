import {
  BottomNavTabItem,
  type BottomNavTabItemProps,
} from "./BottomNavTabItem";
import { useLocation } from "react-router";

const activeTitleClassName = "text-zinc-300 font-semibold";
const inactiveTitleClassName = "text-zinc-500 font-medium";

export type BottomNavTabItemOption = Pick<
  BottomNavTabItemProps,
  "title" | "icon" | "href"
>;

type Props = { items: BottomNavTabItemOption[] };

export const BottomNavTabs = ({ items }: Props) => {
  const { pathname } = useLocation();

  return (
    <div className="bg-[#252525] px-4 pt-4 pb-6 flex drop-shadow-[0_0px_30px_rgba(255,255,255,0.08)]">
      {items.map((item, index) => (
        <BottomNavTabItem
          key={`bottom-nav-tabs-${index}`}
          className="flex-1"
          titleClassName={
            pathname === item.href
              ? activeTitleClassName
              : inactiveTitleClassName
          }
          {...item}
        />
      ))}
    </div>
  );
};
