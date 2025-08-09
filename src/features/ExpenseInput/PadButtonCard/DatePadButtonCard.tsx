import { PadButtonCard } from "@features/ExpenseInput/PadButtonCard/PadButtonCard";

type Props = { onClick?: () => void };

export const DatePadButtonCard = ({ onClick }: Props) => (
  <PadButtonCard className="bg-green-600 font-semibold" onClick={onClick}>
    Today
  </PadButtonCard>
);
