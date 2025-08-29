import { useAppStore } from "@stores/appStore";
import type { AppLocale } from "@utils/types";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useLocale = () => {
  const { i18n } = useTranslation();
  const { locale, setLocale } = useAppStore();

  const changeLocale = useCallback(
    async (locale: AppLocale) => {
      try {
        await i18n.changeLanguage(locale);
        setLocale(locale);
      } catch (err) {
        console.error(err);
      }
    },
    [i18n, setLocale]
  );

  return { locale, changeLocale };
};
