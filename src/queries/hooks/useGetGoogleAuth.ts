import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetGoogleAuthKey = ["getGoogleAuth"];

const apiPath = "https://www.googleapis.com/oauth2/v1/tokeninfo";

type Params = { token: string };

type Options = { skip?: boolean; lazy?: boolean };

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

export const useGetGoogleAuth = (
  { token }: Params,
  { skip = false, lazy = false }: Options
) =>
  useQuery({
    queryKey: [...useGetGoogleAuthKey, token],
    queryFn: async () =>
      (
        await axios.get<GoogleOauthTokenInfo>(apiPath, {
          params: { access_token: token },
        })
      ).data,
    enabled: !skip && !lazy,
  });
