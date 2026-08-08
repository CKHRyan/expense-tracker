import type { BottomNavTabItemOption } from "@components/BottomNavTabs";
import { useTranslation } from "react-i18next";
import { path } from "src/routes/constants/path";

export const useBottomNavTabItemOptions = (): BottomNavTabItemOption[] => {
  const { t } = useTranslation();

  return [
    {
      title: t("navTab.expenses"),
      icon: "icon-[streamline-ultimate-color--cash-payment-coin-dollar]",
      href: path.expenseList,
    },
    {
      title: t("navTab.analysis"),
      icon: "icon-[twemoji--bar-chart]",
      href: path.analysis,
    },
    {
      title: t("navTab.menu"),
      icon: "icon-[ep--more-filled]",
      href: path.menu,
    },
  ];
};
