import { Icon } from "@components";
import { PadButtonCard } from "@features/ExpenseInput/PadButtonCard/PadButtonCard";

type Props = { onClick?: () => void };

export const CalcluatePadButtonCard = ({ onClick }: Props) => (
  <PadButtonCard className="bg-blue-500" onClick={onClick}>
    <Icon name="icon-[fa7-solid--equals]" />
  </PadButtonCard>
);
