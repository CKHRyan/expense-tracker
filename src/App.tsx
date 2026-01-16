import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router";
import { AppRouter } from "src/routes/AppRouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "src/queries/utils";
import { config } from "@utils/config";

export const App = () => (
  <GoogleOAuthProvider clientId={config.googleOAuthClientId}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
