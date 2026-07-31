import GoogleButton from "react-google-button";
import { useAuth } from "@hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useLocale } from "@hooks/useLocale";
import { Button, Text } from "@components";
import { StorageMode } from "@features/ExpenseInput/types";
import { useConfirmModal } from "@components/Modal/ConfirmModal/useConfirmModal";
import { useTransactionUtils } from "@utils/transactions";
import { useAppStore } from "@stores";
import { useNavigate } from "react-router";
import { path } from "src/routes/constants/path";

export const Entry = () => {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const navigate = useNavigate();
  const { confirm } = useConfirmModal();

  const { login } = useAuth();

  const { storageMode, setStorageMode } = useAppStore();
  const { clearLocalTransactions } = useTransactionUtils(storageMode);

  const onUnsync = async () => {
    try {
      const isConfirmed = await confirm({
        title: t("entry.unsync"),
        description: t("entry.unsync.prompt"),
      });
      if (!isConfirmed) return;

      clearLocalTransactions();

      setStorageMode(StorageMode.LOCAL);

      navigate(path.root);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="p-8 w-full h-full flex flex-col items-center justify-center gap-16">
      <div className="flex flex-col items-center justify-center gap-8">
        <img src="icon-256.png" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <GoogleButton
          label={t("entry.googleSignIn")}
          lang={locale}
          onClick={() => login()}
          style={{ width: "320px" }}
        />
        <Text>{t("entry.or")}</Text>
        <Button onClick={onUnsync} colorVariant="warning">
          {t("entry.unsync")}
        </Button>
      </div>
    </div>
  );
};
