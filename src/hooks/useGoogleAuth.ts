import {
  useGoogleLogin,
  type UseGoogleLoginOptions,
  type UseGoogleLoginOptionsAuthCodeFlow,
  type UseGoogleLoginOptionsImplicitFlow,
} from "@react-oauth/google";
import { useAuthByCode } from "src/queries/hooks/useAuthByCode";
import { GOOGLE_OAUTH_SCOPES } from "@utils/google/constants";
import { useAuthStore } from "@stores";
import { config } from "@utils/config";

const googleAuthScope = GOOGLE_OAUTH_SCOPES.join(" ");

export const useGoogleAuth = () => {
  const { setToken } = useAuthStore();
  const { mutateAsync: authByCode } = useAuthByCode();

  const implicitParams: UseGoogleLoginOptionsImplicitFlow = {
    onSuccess: ({ access_token }) => setToken(access_token),
    flow: "implicit",
  };

  const authCodeParams: UseGoogleLoginOptionsAuthCodeFlow = {
    onSuccess: ({ code }) => authByCode(code),
    onError: (err) => console.error(err),
    scope: googleAuthScope,
    flow: "auth-code",
  };

  return (useGoogleLogin as (options: UseGoogleLoginOptions) => void)(
    config.enableAuthService ? authCodeParams : implicitParams
  );
};
