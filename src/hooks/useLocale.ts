import { useAppStore } from "@stores/appStore";
import type { AppLocale } from "@utils/types";
import { useTranslation } from "react-i18next";

export const useLocale = () => {
  const { i18n } = useTranslation();
  const { locale, setLocale } = useAppStore();

  const changeLocale = async (locale: AppLocale) => {
    try {
      await i18n.changeLanguage(locale);
      setLocale(locale);
    } catch (err) {
      console.error(err);
    }
  };

  return { locale, changeLocale };
};
