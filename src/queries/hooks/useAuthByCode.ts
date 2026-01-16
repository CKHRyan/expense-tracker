import { useAuthStore } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { authAxios } from "@utils/axios";
import { config } from "@utils/config";
import { logError } from "src/queries/helpers";

export const useGoogleAuthKey = ["googleAuth"];

const authApiPath = "/api/google-auth";

type GoogleAuthInfo = {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  email: string;
};

export const useAuthByCode = () => {
  const { setToken, setRefreshToken } = useAuthStore();

  return useMutation({
    mutationKey: [...useGoogleAuthKey],
    mutationFn: async (code: string) => {
      if (!config.enableAuthService) {
        throw new Error("Refresh token failed as auth service is not enabled");
      }

      return (
        await authAxios.post<GoogleAuthInfo>(authApiPath, {
          code,
        })
      ).data;
    },
    onSuccess: ({ access_token, refresh_token }) => {
      setToken(access_token);
      setRefreshToken(refresh_token);
    },
    onError: logError,
  });
};
