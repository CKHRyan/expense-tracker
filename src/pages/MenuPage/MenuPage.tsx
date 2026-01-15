import { Text, Title } from "@components";
import {
  GoogleAvatar,
  LocaleMenuItem,
  Menu,
  useMenuItemOptions,
} from "@features/Menu";
import { useTranslation } from "react-i18next";
import { useGoogleUserInfo } from "src/queries/hooks/useGoogleUserInfo";

export const MenuPage = () => {
  const items = useMenuItemOptions();
  const { data: userInfo } = useGoogleUserInfo();
  const { t } = useTranslation();

  return (
    <div>
      <div className="px-6 py-4 flex items-center gap-6">
        <Title className="flex-1 min-w-[4rem]">{t("menu.menu")}</Title>
        <div className="flex items-center gap-3 text-right">
          <Text className="text-lg flex-1">{userInfo?.name}</Text>
          <GoogleAvatar userInfo={userInfo} />
        </div>
      </div>
      <Menu
        items={items}
        header={<LocaleMenuItem />}
        headerDivider
        menuItemClassName="p-6"
      />
    </div>
  );
};
