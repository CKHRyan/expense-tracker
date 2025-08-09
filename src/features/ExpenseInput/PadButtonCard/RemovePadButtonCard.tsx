import { PadButtonCard } from "@features/ExpenseInput/PadButtonCard/PadButtonCard";

type Props = { onClick?: () => void };

export const RemovePadButtonCard = ({ onClick }: Props) => (
  <PadButtonCard className="bg-red-500" onClick={onClick}>
    Remove
  </PadButtonCard>
);
