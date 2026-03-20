const env = import.meta.env;

export const config = {
  googleApiKey: env.VITE_GOOGLE_API_KEY,
  googleOAuthClientId: env.VITE_GOOGLE_OAUTH_CLIENT_ID,
  authServiceHost: env.VITE_AUTH_SERVICE_HOST,
  enableAuthService: env.VITE_ENABLE_AUTH_SERVICE === "true",
  queryStaleTime: env.VITE_QUERY_STALE_TIME
    ? parseInt(env.VITE_QUERY_STALE_TIME)
    : 0,
  queryGCTime: env.VITE_QUERY_GC_TIME ? parseInt(env.VITE_QUERY_GC_TIME) : 0,
};
