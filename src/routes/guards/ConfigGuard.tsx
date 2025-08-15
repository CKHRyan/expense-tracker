import { useSheetStore } from "@stores";
import { isNil } from "lodash";
import { Navigate, Outlet, useLocation } from "react-router";
import { path } from "src/routes/constants/path";

export const ConfigGuard = () => {
  const { pathname } = useLocation();
  const { sheetId, sheetIndex } = useSheetStore();

  const isConfigured = !!sheetId && !isNil(sheetIndex);

  if (!isConfigured && pathname !== path.config) {
    return <Navigate to={path.config} />;
  }

  return <Outlet />;
};
