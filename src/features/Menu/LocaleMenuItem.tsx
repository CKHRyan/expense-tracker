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
          className="text-xl"
        >
          {t(`Locale.${locale}`)}
        </Button>
      ))}
    </div>
  );

  return (
    <MenuItem
      title="Language"
      icon="icon-[fluent-mdl2--locale-language]"
      content={content}
      className="p-6"
    />
  );
};
