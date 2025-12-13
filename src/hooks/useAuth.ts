import {
  useGoogleLogin,
  type UseGoogleLoginOptionsImplicitFlow,
} from "@react-oauth/google";
import { useAuthStore } from "@stores";
import { GOOGLE_OAUTH_SCOPES } from "@utils/google/constants";
import { useCallback, useMemo } from "react";
import { useCheckGoogleAuth } from "src/queries/hooks/useCheckGoogleAuth";

export const useAuth = () => {
  const { token, setToken } = useAuthStore();
  const {
    mutateAsync: checkGoogleAuth,
    isIdle,
    isPending,
  } = useCheckGoogleAuth();

  const isAuthLoading = !!token && (isIdle || isPending);

  const isAuth = !!token;

  const loginOptions = useMemo(
    (): UseGoogleLoginOptionsImplicitFlow => ({
      onSuccess: ({ access_token }) => {
        setToken(access_token);
        checkGoogleAuth(access_token);
      },
      onError: (err) => console.error(err),
      scope: GOOGLE_OAUTH_SCOPES.join(" "),
    }),
    [checkGoogleAuth, setToken]
  );

  const login = useGoogleLogin(loginOptions);

  const logout = useCallback(() => {
    setToken(undefined);
  }, [setToken]);

  const verify = useCallback(async () => {
    try {
      if (!token) return false;
      await checkGoogleAuth(token);
      console.log("ttt auth", token);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      logout();
      return false;
    }
  }, [checkGoogleAuth, logout, token]);

  return { token, isAuth, login, logout, verify, isAuthLoading };
};
