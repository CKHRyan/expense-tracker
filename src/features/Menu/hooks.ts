import { useMemo } from "react";
import type { MenuItemOption } from "./Menu";
import { useNavigate } from "react-router";
import { path } from "src/routes/constants/path";
import { useAuth } from "@hooks/useAuth";
import { useTranslation } from "react-i18next";

export const useMenuItemOptions = (): MenuItemOption[] => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t } = useTranslation();

  const options = useMemo(
    () => [
      {
        title: t("menu.sheetConfig"),
        icon: "icon-[bxs--spreadsheet]",
        onClick: () => navigate(path.config),
      },
      {
        title: t("menu.logout"),
        icon: "icon-[material-symbols--logout]",
        onClick: logout,
      },
    ],
    [logout, navigate, t]
  );

  return options;
};
