import { Title } from "@components";
import { LocaleMenuItem, Menu, useMenuItemOptions } from "@features/Menu";
import { useTranslation } from "react-i18next";

export const MenuPage = () => {
  const items = useMenuItemOptions();
  const { t } = useTranslation();

  return (
    <div>
      <Title className="p-6">{t("menu.menu")}</Title>
      <Menu
        items={items}
        header={<LocaleMenuItem />}
        headerDivider
        menuItemClassName="p-6"
      />
    </div>
  );
};
