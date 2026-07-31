import { Button, FormInput, Loading, Title } from "@components";
import { useAuth } from "@hooks/useAuth";
import { useCanGoBack } from "@hooks/useCanGoBack";
import { useAppStore, useAuthStore, useSheetStore } from "@stores";
import { isNil } from "lodash";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { path } from "src/routes/constants/path";
import useDrivePicker from "react-google-drive-picker";
import type { PickerConfiguration } from "react-google-drive-picker/dist/typeDefs";
import { useGetDoc } from "src/queries/hooks/useGetSheet";
import { FormSelect } from "@components/FormSelect";
import { useTranslation } from "react-i18next";
import { useLocale } from "@hooks/useLocale";
import { useGoogleUserInfo } from "src/queries/hooks/useGoogleUserInfo";
import { config } from "@utils/config";
import { useTransactionUtils } from "@utils/transactions";
import { StorageMode } from "@features/ExpenseInput/types";
import { useConfirmModal } from "@components/Modal/ConfirmModal/useConfirmModal";

export const SheetConfigPage = () => {
  const { locale } = useLocale();
  const { t } = useTranslation();

  const { storageMode, setStorageMode } = useAppStore();
  const {
    load: loadTransactions,
    upload: uploadTransactions,
    clearLocalTransactions,
  } = useTransactionUtils(storageMode);

  const { spreadsheetId, sheetId, setSpreadsheetId, setSheetId } =
    useSheetStore();
  const [_spreadsheetId, _setSpreadsheetId] = useState(spreadsheetId ?? "");
  const [_sheetId, _setSheetId] = useState<number | undefined>(sheetId);

  const { data: doc, isLoading: isDocLoading } = useGetDoc(
    _spreadsheetId ?? "",
    {
      skip: !_spreadsheetId,
    },
  );
  const sheetOptions =
    doc?.sheetsByIndex.map(({ a1SheetName, sheetId }, index) => ({
      value: sheetId,
      label: `${index + 1} - ${a1SheetName}`,
    })) ?? [];

  const selectedSheetOption = useMemo(() => {
    if (isNil(_sheetId)) return undefined;
    return sheetOptions.find(({ value }) => value === _sheetId);
  }, [_sheetId, sheetOptions]);

  const navigate = useNavigate();
  const canGoBack = useCanGoBack();
  const { isAuth, logout } = useAuth();
  const { token } = useAuthStore();
  const { data: userInfo, isLoading: isUserInfoLoading } = useGoogleUserInfo({
    skip: !isAuth,
  });

  const { confirm } = useConfirmModal();

  const isLoading = (!!spreadsheetId && isDocLoading) || isUserInfoLoading;
  const isSheetLoadedBefore = !!spreadsheetId && !isNil(sheetId);
  const isGoBackShown =
    storageMode !== StorageMode.SHEET || (isAuth && isSheetLoadedBefore);

  const isFilled = !!_spreadsheetId && !isNil(_sheetId);

  const onSync = async () => {
    try {
      if (!isFilled) {
        throw new Error(t("error.missingSheetData"));
      }

      const isConfirmed = await confirm({
        title: t("sheetConfig.syncRecords.promptTitle"),
        description: t("sheetConfig.syncRecords.prompt"),
      });
      if (!isConfirmed) return;

      setSpreadsheetId(_spreadsheetId);
      setSheetId(_sheetId);

      clearLocalTransactions();

      setStorageMode(StorageMode.SHEET);

      if (storageMode === StorageMode.SHEET && !isSheetLoadedBefore) {
        navigate(path.expenseList);
      }
    } catch (e) {
      alert(e);
    }
  };

  const onUnsync = async () => {
    try {
      const isConfirmed = await confirm({
        title: t("sheetConfig.unsyncRecords.promptTitle"),
        description: t("sheetConfig.unsyncRecords.prompt"),
      });
      if (!isConfirmed) return;

      if (isSheetLoadedBefore) {
        await loadTransactions(spreadsheetId, sheetId);
      }

      setStorageMode(StorageMode.LOCAL);
    } catch (e) {
      alert(e);
    }
  };

  const onLoad = async () => {
    try {
      if (!isFilled) {
        throw new Error(t("error.missingSheetData"));
      }

      const isConfirmed = await confirm({
        title: t("sheetConfig.loadRecords.promptTitle"),
        description: t("sheetConfig.loadRecords.prompt"),
      });
      if (!isConfirmed) return;

      setSpreadsheetId(_spreadsheetId);
      setSheetId(_sheetId);

      await loadTransactions(_spreadsheetId, _sheetId);
    } catch (e) {
      alert(e);
    }
  };

  const onUpload = async () => {
    if (!isFilled) {
      throw new Error(t("error.missingSheetData"));
    }

    const isConfirmed = await confirm({
      title: t("sheetConfig.uploadRecords.promptTitle"),
      description: t("sheetConfig.uploadRecords.prompt"),
    });
    if (!isConfirmed) return;

    setSpreadsheetId(_spreadsheetId);
    setSheetId(_sheetId);

    await uploadTransactions(_spreadsheetId, _sheetId);
  };

  const onBackClick = () => {
    if (canGoBack) {
      navigate(-1);
    } else {
      navigate(path.root);
    }
  };

  const [openPicker] = useDrivePicker();

  const onSelectDoc = () => {
    const pickerConfig: PickerConfiguration = {
      clientId: config.googleOAuthClientId,
      developerKey: config.googleApiKey,
      viewId: "SPREADSHEETS",
      token,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      callbackFunction: ({ action, docs }) => {
        if (action === "cancel" || !docs || docs.length === 0) {
          return;
        }
        const spreadsheetId = docs[0].id;
        _setSpreadsheetId(spreadsheetId);
        _setSheetId(undefined);
      },
      locale,
    };
    openPicker(pickerConfig);
  };

  const onSelectSheet = ({ value }: { value: number }) => {
    _setSheetId(value);
  };

  if (isLoading) {
    return <Loading isFullScreen />;
  }

  return (
    <div className="p-8 flex flex-col gap-10">
      <Title>{t("sheetConfig.sheetParameters")}</Title>
      <div className="flex flex-col gap-6">
        <FormInput
          id="linkedAccount"
          label={t("sheetConfig.linkedAccount")}
          value={userInfo?.email}
          readOnly
        />
        <div className="flex gap-4 items-end">
          <FormInput
            id="spreadsheet"
            label={t("sheetConfig.spreadsheet")}
            required
            value={doc?.title ?? ""}
            readOnly
            className="flex-1"
          />
          <Button onClick={onSelectDoc}>{t("sheetConfig.selectSheet")}</Button>
        </div>
        <FormSelect
          id="sheet"
          label={t("sheetConfig.sheetTab")}
          required
          isDisabled={!_spreadsheetId}
          options={sheetOptions}
          value={selectedSheetOption}
          onChange={onSelectSheet as any}
        />
      </div>
      <div className="flex flex-col gap-4">
        {storageMode === StorageMode.SHEET && (
          <Button
            onClick={onUnsync}
            disabled={!isFilled}
            colorVariant="warning"
          >
            {t("sheetConfig.unsyncRecords")}
          </Button>
        )}
        {storageMode === StorageMode.LOCAL && (
          <>
            <Button onClick={onLoad} disabled={!isFilled}>
              {t("sheetConfig.loadRecords")}
            </Button>
            <Button onClick={onUpload} disabled={!isFilled}>
              {t("sheetConfig.uploadRecords")}
            </Button>
            <Button
              onClick={onSync}
              disabled={!isFilled}
              colorVariant="warning"
            >
              {t("sheetConfig.syncRecords")}
            </Button>
          </>
        )}
        {isGoBackShown ? (
          <Button onClick={onBackClick} colorVariant="secondary">
            {t("sheetConfig.goBack")}
          </Button>
        ) : (
          <Button
            onClick={() => logout({ keepSyncTransactions: true })}
            colorVariant="secondary"
          >
            {t("sheetConfig.switchToAnotherAccount")}
          </Button>
        )}
      </div>
    </div>
  );
};
