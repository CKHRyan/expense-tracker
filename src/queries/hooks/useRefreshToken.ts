import { useMutation } from "@tanstack/react-query";
import { logError } from "src/queries/helpers";
import { useAuthStore } from "@stores";
import { authAxios } from "@utils/axios";

const useRefreshTokenKey = ["refreshToken"];

const authApiPath = "/api/google-refresh";

type RefreshTokenInfo = {
  access_token: string;
  session_token: string;
  expires_in: string;
};

export const useRefreshToken = () => {
  const { session, setToken, setSession, email, clearAuth } = useAuthStore();

  return useMutation({
    mutationKey: [...useRefreshTokenKey],
    mutationFn: async () =>
      (
        await authAxios.post<RefreshTokenInfo>(authApiPath, {
          email,
          session_token: session,
        })
      ).data,
    onSuccess: ({ access_token, session_token }) => {
      setToken(access_token);
      setSession(session_token);
    },
    onError: (err: any) => {
      logError(err);
      clearAuth();
    },
  });
};
