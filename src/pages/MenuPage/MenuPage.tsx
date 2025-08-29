import { Title } from "@components";
import { LocaleMenuItem, Menu, useMenuItemOptions } from "@features/Menu";

export const MenuPage = () => {
  const items = useMenuItemOptions();

  return (
    <div>
      <Title className="p-6">Menu</Title>
      <Menu
        items={items}
        header={<LocaleMenuItem />}
        headerDivider
        menuItemClassName="p-6"
      />
    </div>
  );
};
