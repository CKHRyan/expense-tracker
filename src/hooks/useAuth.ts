import { useGoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "@stores";
import { useCallback } from "react";
import { useCheckGoogleAuth } from "src/queries/hooks/useCheckGoogleAuth";

const googleOAuthScope = "https://www.googleapis.com/auth/spreadsheets";

export const useAuth = () => {
  const { token, setToken } = useAuthStore();
  const { mutate: checkGoogleAuth, isIdle, isPending } = useCheckGoogleAuth();

  const isAuthLoading = !!token && (isIdle || isPending);

  const isAuth = !!token;

  const login = useGoogleLogin({
    onSuccess: ({ access_token }) => {
      setToken(access_token);
      checkGoogleAuth(access_token);
    },
    onError: (err) => console.error(err),
    scope: googleOAuthScope,
  });

  const logout = useCallback(() => setToken(undefined), [setToken]);

  const verify = useCallback(async () => {
    try {
      if (!token) return false;
      await checkGoogleAuth(token);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      logout();
      return false;
    }
  }, [checkGoogleAuth, logout, token]);

  return { token, isAuth, login, logout, verify, isAuthLoading };
};
