import { useAuthStore } from "@stores";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "react-google-button";
import { Icon, Title } from "@components";

export const Entry = () => {
  const { setToken } = useAuthStore();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => setToken(tokenResponse.access_token),
    onError: (err) => console.error(err),
    scope: "https://www.googleapis.com/auth/spreadsheets",
  });

  return (
    <div className="p-8 w-full h-full flex flex-col items-center justify-center gap-16">
      <div className="flex flex-col items-center justify-center gap-8">
        <Icon
          name="icon-[streamline-stickies-color--money-briefcase]"
          className="w-[180px] h-[180px]"
        />
        <Title>Expense Tracker</Title>
      </div>
      <GoogleButton onClick={() => login()}>Login</GoogleButton>
    </div>
  );
};
