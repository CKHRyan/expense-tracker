import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router";
import { AppRouter } from "src/routes/AppRouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "src/queries/utils";
import { config } from "@utils/config";
import { ConfirmModalProvider } from "@components/Modal/ConfirmModal";

export const App = () => (
  <GoogleOAuthProvider clientId={config.googleOAuthClientId}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ConfirmModalProvider>
          <AppRouter />
        </ConfirmModalProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
