import { Entry } from "@/features/entry/Entry";
import { ExpenseList } from "@/features/expenseList/ExpenseList";
import { SheetConfig } from "@/features/sheetConfig/SheetConfig";
import { JourneyState, useJourneyState } from "@/hooks/useJourneyState";

export const HomePage = () => {
  const journeyState = useJourneyState();

  switch (journeyState) {
    case JourneyState.Auth:
      return <Entry />;
    case JourneyState.Config:
      return <SheetConfig />;
    case JourneyState.Onboarded:
      return <ExpenseList />;
  }

  return <p>Please refresh</p>;
};
