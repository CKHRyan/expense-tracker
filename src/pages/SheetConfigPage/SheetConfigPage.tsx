import { Button, FormInput, Title } from "@components";
import { useAuth } from "@hooks/useAuth";
import { useCanGoBack } from "@hooks/useCanGoBack";
import { useAuthStore, useSheetStore } from "@stores";
import { isNil } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { path } from "src/routes/constants/path";
import useDrivePicker from "react-google-drive-picker";
import type { PickerConfiguration } from "react-google-drive-picker/dist/typeDefs";
import { useGetDoc } from "src/queries/hooks/useGetSheet";
import { FormSelect } from "@components/FormSelect";
import { useTranslation } from "react-i18next";
import { useLocale } from "@hooks/useLocale";

export const SheetConfigPage = () => {
  const { locale } = useLocale();
  const { t } = useTranslation();

  const { spreadsheetId, sheetId, setSpreadsheetId, setSheetId } =
    useSheetStore();
  const [_spreadsheetId, _setSpreadsheetId] = useState(spreadsheetId ?? "");
  const [_sheetId, _setSheetId] = useState<number | undefined>(sheetId);

  const { data: doc } = useGetDoc(_spreadsheetId ?? "", {
    skip: !_spreadsheetId,
  });
  const sheetOptions = useMemo(
    () =>
      doc?.sheetsByIndex.map(({ a1SheetName, sheetId }, index) => ({
        value: sheetId,
        label: `${index + 1} - ${a1SheetName}`,
      })) ?? [],
    [doc?.sheetsByIndex]
  );
  const selectedSheetOption = useMemo(() => {
    if (isNil(_sheetId)) return undefined;
    return sheetOptions.find(({ value }) => value === _sheetId);
  }, [_sheetId, sheetOptions]);

  const navigate = useNavigate();
  const canGoBack = useCanGoBack();
  const { isAuth, logout } = useAuth();
  const { token } = useAuthStore();
  const isConfiguredBefore = !!spreadsheetId && !isNil(sheetId);
  const isGoBackShown = isAuth && isConfiguredBefore;

  const isDirty = spreadsheetId !== _spreadsheetId || sheetId !== _sheetId;

  const onLoad = useCallback(() => {
    try {
      if (!_spreadsheetId || isNil(_sheetId)) {
        throw new Error(t("error.missingSheetData"));
      }
      setSpreadsheetId(_spreadsheetId);
      setSheetId(_sheetId);
      if (!isConfiguredBefore) {
        navigate(path.expenseList);
      }
    } catch (e) {
      alert(e);
    }
  }, [
    _spreadsheetId,
    _sheetId,
    setSpreadsheetId,
    setSheetId,
    isConfiguredBefore,
    t,
    navigate,
  ]);

  const onBackClick = useCallback(() => {
    if (canGoBack) {
      navigate(-1);
    } else {
      navigate(path.root);
    }
  }, [canGoBack, navigate]);

  const [openPicker] = useDrivePicker();

  const onSelectDoc = useCallback(() => {
    const config: PickerConfiguration = {
      clientId: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
      developerKey: import.meta.env.VITE_GOOGLE_API_KEY,
      viewId: "SPREADSHEETS",
      token,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      callbackFunction: ({ action, docs }) => {
        if (action === "cancel" || (docs && docs.length === 0)) {
          return;
        }
        const spreadsheetId = docs[0].id;
        _setSpreadsheetId(spreadsheetId);
        _setSheetId(undefined);
      },
      locale,
    };
    openPicker(config);
  }, [locale, openPicker, token]);

  const onSelectSheet = ({ value }: { value: number }) => {
    _setSheetId(value);
  };

  return (
    <div className="p-8 flex flex-col gap-10">
      <Title>{t("sheetConfig.sheetParameters")}</Title>
      <div className="flex flex-col gap-6">
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
        <Button onClick={onLoad} disabled={!isDirty}>
          {t("sheetConfig.loadRecords")}
        </Button>
        {isGoBackShown ? (
          <Button onClick={onBackClick}>{t("sheetConfig.goBack")}</Button>
        ) : (
          <Button onClick={logout}>
            {t("sheetConfig.switchToAnotherAccount")}
          </Button>
        )}
      </div>
    </div>
  );
};
