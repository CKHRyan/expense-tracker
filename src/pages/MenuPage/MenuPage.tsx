import { Title } from "@components";
import { Menu, useMenuItemOptions } from "@features/Menu";

export const MenuPage = () => {
  const items = useMenuItemOptions();

  return (
    <div>
      <Title className="p-6">Menu</Title>
      <Menu items={items} menuItemClassName="p-6" />
    </div>
  );
};
