import { useCallback, useMemo } from "react";
import type { MenuItemOption } from "./Menu";
import { useNavigate } from "react-router";
import { path } from "src/routes/constants/path";
import { useAuth } from "@hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useAppStore, useSheetStore } from "@stores";
import { useConfirmModal } from "@components/Modal/ConfirmModal/useConfirmModal";
import { StorageMode } from "@features/ExpenseInput/types";

export const useMenuItemOptions = (): MenuItemOption[] => {
  const { t } = useTranslation();

  const { isAuth, logout, login } = useAuth();
  const { resetSheetConfig } = useSheetStore();
  const { storageMode } = useAppStore();

  const navigate = useNavigate();
  const { confirm } = useConfirmModal();

  const onLogoutPress = useCallback(async () => {
    const isConfirmed = await confirm({
      title: t("menu.logout"),
      description:
        storageMode === StorageMode.SHEET
          ? t("menu.logout.prompt.unsync")
          : t("menu.logout.prompt"),
    });
    if (!isConfirmed) return;

    logout({ keepSyncTransactions: true });
    resetSheetConfig();
  }, [confirm, logout, resetSheetConfig, storageMode, t]);

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
