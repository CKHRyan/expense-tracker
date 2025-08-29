import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router";
import { AppRouter } from "src/routes/AppRouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "src/queries/utils";

export const App = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
