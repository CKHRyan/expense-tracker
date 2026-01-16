import { useMutation } from "@tanstack/react-query";
import { logError } from "src/queries/helpers";
import { useAuthStore } from "@stores";
import { authAxios } from "@utils/axios";
import { config } from "@utils/config";

const useRefreshTokenKey = ["refreshToken"];

const authApiPath = "/api/google-refresh";

type RefreshTokenInfo = {
  access_token: string;
  refresh_token: string;
  expires_in: string;
};

export const useRefreshToken = () => {
  const { refreshToken, setToken, setRefreshToken, clearAuth } = useAuthStore();

  return useMutation({
    mutationKey: [...useRefreshTokenKey],
    mutationFn: async () => {
      if (!config.enableAuthService) {
        throw new Error("Refresh token failed as auth service is not enabled");
      }

      return (
        await authAxios.post<RefreshTokenInfo>(authApiPath, {
          refresh_token: refreshToken,
        })
      ).data;
    },
    onSuccess: ({ access_token, refresh_token }) => {
      setToken(access_token);
      if (refresh_token) {
        setRefreshToken(refresh_token);
      }
    },
    onError: (err: any) => {
      logError(err);
      clearAuth();
    },
  });
};
