import { useTranslation } from "react-i18next";
import { MenuItem } from "./MenuItem";
import { Button } from "@components";
import { useLocale } from "@hooks/useLocale";
import { APP_LOCALES } from "@utils/types";

export const LocaleMenuItem = () => {
  const { t } = useTranslation();
  const { locale: currentLocale, changeLocale } = useLocale();

  const content = (
    <div className="flex gap-2 items-center">
      {APP_LOCALES.map((locale) => (
        <Button
          key={`locale-btn-${locale}`}
          variant="text"
          disabled={currentLocale === locale}
          onClick={() => changeLocale(locale)}
          className="opacity-50 disabled:opacity-100"
        >
          {t(`menu.locale.${locale}`)}
        </Button>
      ))}
    </div>
  );

  return (
    <MenuItem
      title={t("menu.language")}
      icon="icon-[fluent-mdl2--locale-language]"
      content={content}
      className="p-6"
    />
  );
};
