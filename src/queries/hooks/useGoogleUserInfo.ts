import { useAuth } from "@hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { QueryOptions } from "src/queries/types";

export const useGoogleUserInfoKey = ["googleUserInfo"];

const apiPath = "https://www.googleapis.com/oauth2/v1/userinfo";

export type GoogleOauthUserInfo = {
  id: string;
  email: string;
  family_name: string;
  given_name: string;
  name: string;
  picture: string;
  verified_email: boolean;
};

export const useGoogleUserInfo = (option?: QueryOptions) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: [...useGoogleUserInfoKey, token],
    queryFn: async () =>
      (
        await axios.get<GoogleOauthUserInfo>(apiPath, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data,
    staleTime: 30000,
    enabled: !option?.skip,
  });
};
