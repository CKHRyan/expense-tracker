import { useCallback, useMemo } from "react";
import type { MenuItemOption } from "./Menu";
import { useNavigate } from "react-router";
import { path } from "src/routes/constants/path";
import { useAuth } from "@hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useSheetStore } from "@stores";
import { useConfirmModal } from "@components/Modal/ConfirmModal/useConfirmModal";

export const useMenuItemOptions = (): MenuItemOption[] => {
  const { t } = useTranslation();

  const { isAuth, logout, login } = useAuth();
  const { resetSheetConfig } = useSheetStore();

  const navigate = useNavigate();
  const { confirm } = useConfirmModal();

  const onLogoutPress = useCallback(async () => {
    const isConfirmed = await confirm({
      title: t("menu.logout"),
      description: t("menu.logout.prompt"),
    });
    if (!isConfirmed) return;

    logout();
    resetSheetConfig();
  }, [confirm, logout, resetSheetConfig, t]);

  const options = useMemo(
    () => [
      ...(!isAuth
        ? [
            {
              title: t("menu.login"),
              icon: "icon-[material-symbols--login]",
              onClick: login,
            },
          ]
        : [
            {
              title: t("menu.sheetSync"),
              icon: "icon-[bxs--spreadsheet]",
              onClick: () => navigate(path.config),
            },
            {
              title: t("menu.logout"),
              icon: "icon-[material-symbols--logout]",
              onClick: onLogoutPress,
            },
          ]),
    ],
    [isAuth, login, navigate, onLogoutPress, t],
  );

  return options;
};
