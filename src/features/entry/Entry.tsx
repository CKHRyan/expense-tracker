import GoogleButton from "react-google-button";
import { Icon, Title } from "@components";
import { useAuth } from "@hooks/useAuth";

export const Entry = () => {
  const { login } = useAuth();

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
