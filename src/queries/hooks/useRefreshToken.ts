import { useMutation } from "@tanstack/react-query";
import { logError } from "src/queries/helpers";
import { useAuthStore } from "@stores";
import { authAxios } from "@utils/axios";

const useRefreshTokenKey = ["refreshToken"];

const authApiPath = "/api/google-refresh";

type RefreshTokenInfo = {
  access_token: string;
  expires_in: string;
};

export const useRefreshToken = () => {
  const { token, setToken, email, clearAuth } = useAuthStore();

  return useMutation({
    mutationKey: [...useRefreshTokenKey],
    mutationFn: async () =>
      (
        await authAxios.post<RefreshTokenInfo>(authApiPath, {
          email,
          access_token: token,
        })
      ).data,
    onSuccess: ({ access_token }) => {
      setToken(access_token);
    },
    onError: (err: any) => {
      logError(err);
      clearAuth();
    },
  });
};
