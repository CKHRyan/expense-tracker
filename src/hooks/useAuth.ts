import { useGoogleAuth } from "@hooks/useGoogleAuth";
import { useAuthStore } from "@stores";
import { config } from "@utils/config";
import { useCallback } from "react";
import { useCheckGoogleAuth } from "src/queries/hooks/useCheckGoogleAuth";
import { useRefreshToken } from "src/queries/hooks/useRefreshToken";

export const useAuth = () => {
  const { token, clearAuth } = useAuthStore();
  const {
    mutateAsync: checkGoogleAuth,
    isIdle: isGoogleAuthUnchecked,
    isPending: isCheckGoogleAuthLoading,
    isError: isGoogleAuthFailed,
  } = useCheckGoogleAuth();
  const {
    mutateAsync: refreshToken,
    isIdle: isRefreshTokenIdle,
    isPending: isRefreshingToken,
  } = useRefreshToken();

  const isAuthLoading =
    !!token &&
    (isGoogleAuthUnchecked ||
      isCheckGoogleAuthLoading ||
      (isGoogleAuthFailed && (isRefreshTokenIdle || isRefreshingToken)));

  const isAuth = !!token;

  const googleLogin = useGoogleAuth();

  const verify = useCallback(async () => {
    try {
      if (!token) return false;
      await checkGoogleAuth(token);
      return true;
    } catch (err) {
      console.error(err);
      if (config.enableAuthService) {
        await refreshToken();
      }
      return false;
    }
  }, [checkGoogleAuth, refreshToken, token]);

  return {
    token,
    isAuth,
    login: googleLogin,
    logout: clearAuth,
    verify,
    isAuthLoading,
  };
};
