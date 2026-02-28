import { Icon, Text } from "@components";
import { useTranslation } from "react-i18next";

export const AuthLockChip = () => {
  const { t } = useTranslation();

  return (
    <div className="px-2 py-0.5 bg-orange-400 rounded-3xl flex gap-1 items-center">
      <Text className="text-sm">{t("menu.authLockLabel")}</Text>
      <Icon name="icon-[mdi--lock]" />
    </div>
  );
};
