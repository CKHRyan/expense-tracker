import { useAuthStore } from "@stores";
import { useCallback } from "react";
import { useGetGoogleAuth } from "src/queries/hooks/useGetGoogleAuth";

export const useAuth = () => {
  const { token, setToken } = useAuthStore();
  const {
    refetch,
    isFetched,
    isError,
    isLoading: isLoadingAuth,
  } = useGetGoogleAuth({ token: token ?? "" }, { skip: !token, lazy: true });

  const isAuth = !!token && isFetched && !isError;

  const verify = useCallback(async () => {
    try {
      await refetch();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }, [refetch]);

  const logout = useCallback(() => setToken(undefined), [setToken]);

  return { isAuth, logout, verify, isLoadingAuth };
};
