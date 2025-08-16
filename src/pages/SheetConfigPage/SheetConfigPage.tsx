import { Button, FormInput, Title } from "@components";
import { useAuth } from "@hooks/useAuth";
import { useCanGoBack } from "@hooks/useCanGoBack";
import { useAuthStore, useSheetStore } from "@stores";
import { isNil } from "lodash";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { path } from "src/routes/constants/path";
import useDrivePicker from "react-google-drive-picker";
import type { PickerConfiguration } from "react-google-drive-picker/dist/typeDefs";

export const SheetConfigPage = () => {
  const { sheetId, sheetIndex, setSheetId, setSheetIndex } = useSheetStore();
  const [_sheetId, _setSheetId] = useState(sheetId ?? "");
  const [_sheetIndex, _setSheetIndex] = useState<number | undefined>(
    sheetIndex
  );

  const navigate = useNavigate();
  const canGoBack = useCanGoBack();
  const { isAuth } = useAuth();
  const { token } = useAuthStore();
  const isConfiguredBefore = !!sheetId && !isNil(sheetIndex);
  const isGoBackShown = isAuth && isConfiguredBefore;

  const isDirty = sheetId !== _sheetId || sheetIndex !== _sheetIndex;

  const onLoad = useCallback(() => {
    try {
      if (!_sheetId || isNil(_sheetIndex)) {
        throw new Error("Missing required sheet data");
      }
      setSheetId(_sheetId);
      setSheetIndex(_sheetIndex);
      if (!isConfiguredBefore) {
        navigate(path.expenseList);
      }
    } catch (e) {
      alert(e);
    }
  }, [
    _sheetId,
    _sheetIndex,
    isConfiguredBefore,
    navigate,
    setSheetId,
    setSheetIndex,
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
        if (action === "cancel" || docs.length === 0) {
          return;
        }
        const sheetId = docs[0].id;
        _setSheetId(sheetId);
      },
    };
    openPicker(config);
  }, [openPicker, token]);

  return (
    <div className="p-8 flex flex-col gap-10">
      <Title>Sheet Parameters</Title>
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <FormInput
            id="sheetId"
            label="Spreadsheet Id"
            required
            value={_sheetId}
            readOnly
            onChange={(e) => _setSheetId(e.target.value)}
            className="flex-1"
          />
          <Button onClick={onSelectDoc}>Select</Button>
        </div>
        <FormInput
          id="sheetId"
          label="Main sheet Index"
          type="number"
          required
          min={0}
          value={_sheetIndex}
          onChange={(e) => _setSheetIndex(Number(e.target.value))}
        />
      </div>
      <Button onClick={onLoad} disabled={!isDirty}>
        LOAD RECORDS
      </Button>
      {isGoBackShown && <Button onClick={onBackClick}>GO BACK</Button>}
    </div>
  );
};
