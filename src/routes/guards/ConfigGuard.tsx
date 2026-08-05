import { StorageMode } from "@features/ExpenseInput/types";
import { useAppStore, useSheetStore } from "@stores";
import { isNil } from "lodash";
import { Navigate, Outlet, useLocation } from "react-router";
import { path } from "src/routes/constants/path";

export const ConfigGuard = () => {
  const { pathname } = useLocation();
  const { spreadsheetId, sheetId } = useSheetStore();
  const { storageMode } = useAppStore();

  const isConfigured = !!spreadsheetId && !isNil(sheetId);

  if (
    storageMode === StorageMode.SHEET &&
    !isConfigured &&
    pathname !== path.sheetConfig
  ) {
    return <Navigate to={path.sheetConfig} />;
  }

  return <Outlet />;
};
