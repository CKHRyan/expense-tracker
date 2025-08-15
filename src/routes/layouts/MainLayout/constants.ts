import type { BottomNavTabItemOption } from "@components/BottomNavTabs";
import { path } from "src/routes/constants/path";

export const bottomNavTabItemOptions: BottomNavTabItemOption[] = [
  {
    title: "EXPENSES",
    icon: "icon-[streamline-ultimate-color--cash-payment-coin-dollar]",
    href: path.expenseList,
  },
  {
    title: "ANALYSIS",
    icon: "icon-[twemoji--bar-chart]",
    href: path.analysis,
  },
  {
    title: "MENU",
    icon: "icon-[ep--more-filled]",
    href: path.menu,
  },
];
