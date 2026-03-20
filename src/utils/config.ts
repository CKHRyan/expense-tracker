const env = import.meta.env;

export const config = {
  googleApiKey: env.VITE_GOOGLE_API_KEY,
  googleServiceAccountApiKey: env.VITE_GOOGLE_SERVICE_ACCOUNT_API_KEY,
  pocSheetId: env.VITE_POC_SHEET_ID,
  googleOAuthClientId: env.VITE_GOOGLE_OAUTH_CLIENT_ID,
  authServiceHost: env.VITE_AUTH_SERVICE_HOST,
  enableAuthService: env.VITE_ENABLE_AUTH_SERVICE === "true",
};
