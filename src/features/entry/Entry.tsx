import GoogleButton from "react-google-button";
import { useAuth } from "@hooks/useAuth";
import { useTranslation } from "react-i18next";

export const Entry = () => {
  const { login } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="p-8 w-full h-full flex flex-col items-center justify-center gap-16">
      <div className="flex flex-col items-center justify-center gap-8">
        <img src="icon-256.png" />
      </div>
      <GoogleButton label={t("entry.googleSignIn")} onClick={() => login()} />
    </div>
  );
};
