import { Icon } from "@components";
import { PadButtonCard } from "@features/ExpenseInput/PadButtonCard/PadButtonCard";

type Props = { onClick?: () => void };

export const DatePadButtonCard = ({ onClick }: Props) => (
  <PadButtonCard className="bg-green-600" onClick={onClick}>
    <Icon name="icon-[solar--calendar-bold]" className="text-3xl" />
  </PadButtonCard>
);
