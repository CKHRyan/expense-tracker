import { useSheetStore } from "@stores";
import { isNil } from "lodash";
import { Navigate, Outlet, useLocation } from "react-router";
import { path } from "src/routes/constants/path";

export const ConfigGuard = () => {
  const { pathname } = useLocation();
  const { spreadsheetId, sheetId } = useSheetStore();

  const isConfigured = !!spreadsheetId && !isNil(sheetId);

  if (!isConfigured && pathname !== path.config) {
    return <Navigate to={path.config} />;
  }

  return <Outlet />;
};
