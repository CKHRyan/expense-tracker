import { Icon } from "@components";
import { PadButtonCard } from "@features/ExpenseInput/PadButtonCard/PadButtonCard";

type Props = { onClick?: () => void; disabled?: boolean };

export const ConfirmPadButtonCard = ({ onClick, disabled }: Props) => (
  <PadButtonCard className="bg-blue-500 " onClick={onClick} disabled={disabled}>
    <Icon name="icon-[icon-park-solid--transaction]" className="text-3xl" />
  </PadButtonCard>
);
