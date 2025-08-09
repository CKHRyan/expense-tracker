import { GoogleOAuthProvider } from "@react-oauth/google";
import { JourneyState, useJourneyState } from "@hooks/useJourneyState";
import { Entry } from "@features/entry/Entry";
import { SheetConfigPage } from "@pages/SheetConfigPage";
import { ExpenseListPage } from "@pages/ExpenseListPage";

export const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      <AppRouter />
    </GoogleOAuthProvider>
  );
};

export const AppRouter = () => {
  const journeyState = useJourneyState();

  switch (journeyState) {
    case JourneyState.Auth:
      return <Entry />;
    case JourneyState.Config:
      return <SheetConfigPage />;
    case JourneyState.Onboarded:
      return <ExpenseListPage />;
  }

  return <p>Please refresh</p>;
};
