import { twMerge } from "tailwind-merge";
import Avatar from "react-avatar";
import type { GoogleOauthUserInfo } from "src/queries/hooks/useGoogleUserInfo";

type Props = {
  userInfo?: GoogleOauthUserInfo;
  className?: string;
  size?: number;
};

export const GoogleAvatar = ({ userInfo, size = 48, className }: Props) => (
  <Avatar
    src={userInfo?.picture}
    name={userInfo?.name}
    size={size?.toString()}
    className={twMerge("rounded-full", className)}
  />
);
