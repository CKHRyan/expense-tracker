import { GoogleOAuthProvider } from "@react-oauth/google";
import { HomePage } from "@/pages/HomePage";

export const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      <HomePage />
    </GoogleOAuthProvider>
  );
};
