import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCheckGoogleAuthKey = ["checkGoogleAuth"];

const apiPath = "https://www.googleapis.com/oauth2/v1/tokeninfo";

type GoogleOauthTokenInfo = {
  issued_to: string;
  audience: string;
  user_id: string;
  scope: string;
  expires_in: number;
  email: string;
  verified_email: boolean;
  access_type: string;
};

export const useCheckGoogleAuth = () => {
  const mutation = useMutation({
    mutationKey: [...useCheckGoogleAuthKey],
    mutationFn: async (token: string) =>
      (
        await axios.get<GoogleOauthTokenInfo>(apiPath, {
          params: { access_token: token },
        })
      ).data,
  });

  return { ...mutation, isLoading: mutation.isIdle || mutation.isPending };
};
