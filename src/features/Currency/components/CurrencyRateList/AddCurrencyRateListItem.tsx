import { useTranslation } from "react-i18next";
import { Icon, Text } from "src/components";
import { ListItemCard } from "src/components/ListItemCard";

type Props = {
  onClick?: () => void;
};

export const AddCurrencyRateListItem = ({ onClick }: Props) => {
  const { t } = useTranslation();

  return (
    <ListItemCard
      onClick={onClick}
      className="p-3 items-center justify-center gap-2"
    >
      <Text className="text-center">
        {t("currencyConfig.currency.cta.add")}
      </Text>
      <Icon name="icon-[fa7-solid--add]" />
    </ListItemCard>
  );
};
