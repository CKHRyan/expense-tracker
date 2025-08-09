import { Icon } from "@components";
import { PadButtonCard } from "@features/ExpenseInput/PadButtonCard/PadButtonCard";

type Props = { onClick?: () => void };

export const ConfirmPadButtonCard = ({ onClick }: Props) => (
  <PadButtonCard className="bg-blue-500" onClick={onClick}>
    <Icon name="icon-[icon-park-solid--transaction]" className="text-3xl" />
  </PadButtonCard>
);
