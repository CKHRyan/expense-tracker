import { useGoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "@stores";
import { GOOGLE_OAUTH_SCOPES } from "@utils/google/constants";
import { useCallback } from "react";
import { useCheckGoogleAuth } from "src/queries/hooks/useCheckGoogleAuth";
import { useGoogleAuth } from "src/queries/hooks/useGoogleAuth";
import { useRefreshToken } from "src/queries/hooks/useRefreshToken";

export const useAuth = () => {
  const { token, clearAuth } = useAuthStore();
  const { mutateAsync: checkGoogleAuth, isLoading: isCheckGoogleAuthLoading } =
    useCheckGoogleAuth();
  const { mutateAsync: authGoogle } = useGoogleAuth();
  const { mutateAsync: refreshToken } = useRefreshToken();

  const isAuthLoading = !!token && isCheckGoogleAuthLoading;

  const isAuth = !!token;

  const loginByCode = useGoogleLogin({
    onSuccess: ({ code }) => authGoogle(code),
    onError: (err) => console.error(err),
    scope: GOOGLE_OAUTH_SCOPES.join(" "),
    flow: "auth-code",
  });

  const verify = useCallback(async () => {
    try {
      if (!token) return false;
      await checkGoogleAuth(token);
      return true;
    } catch (err) {
      console.error(err);
      await refreshToken();
      return false;
    }
  }, [checkGoogleAuth, refreshToken, token]);

  return {
    token,
    isAuth,
    login: loginByCode,
    logout: clearAuth,
    verify,
    isAuthLoading,
  };
};
