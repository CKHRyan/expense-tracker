import { StorageMode } from "@features/ExpenseInput/types";
import { useGoogleAuth } from "@hooks/useGoogleAuth";
import {
  useAppStore,
  useAuthStore,
  useSheetStore,
  useTransactionStore,
} from "@stores";
import { config } from "@utils/config";
import {
  facadeSheetExpenseRow,
  facadeSheetBaseExpenseRecord,
} from "@utils/google/googleSheet/helpers/facade";
import { getSheetRows } from "@utils/google/googleSheet/helpers/spreadsheet";
import { isNil } from "lodash";
import { useCallback } from "react";
import { removeUserInfo } from "src/queries/helpers";
import { useCheckGoogleAuth } from "src/queries/hooks/useCheckGoogleAuth";
import { useRefreshToken } from "src/queries/hooks/useRefreshToken";

export const useAuth = () => {
  const { setStorageMode } = useAppStore();
  const { token, clearAuth } = useAuthStore();
  const {
    mutateAsync: checkGoogleAuth,
    isIdle: isGoogleAuthUnchecked,
    isPending: isCheckGoogleAuthLoading,
    isError: isGoogleAuthFailed,
  } = useCheckGoogleAuth();
  const {
    mutateAsync: refreshToken,
    isIdle: isRefreshTokenIdle,
    isPending: isRefreshingToken,
  } = useRefreshToken();

  const { spreadsheetId, sheetId } = useSheetStore();
  const { setTransactions } = useTransactionStore();

  const isAuthLoading =
    !!token &&
    (isGoogleAuthUnchecked ||
      isCheckGoogleAuthLoading ||
      (isGoogleAuthFailed &&
        config.enableAuthService &&
        (isRefreshTokenIdle || isRefreshingToken)));

  const isAuth = !!token;

  const googleLogin = useGoogleAuth();

  const loadSyncRecords = useCallback(async () => {
    if (!spreadsheetId || isNil(sheetId)) return;

    const sheetRows = await getSheetRows(spreadsheetId, sheetId, {
      token: token ?? "",
    });
    const baseExpenseRecords = sheetRows.map((row) => {
      const rawSheetRecord = facadeSheetExpenseRow(row);
      return facadeSheetBaseExpenseRecord(rawSheetRecord);
    });
    setTransactions(baseExpenseRecords);
  }, [setTransactions, sheetId, spreadsheetId, token]);

  const logout = useCallback(
    (params?: { keepSyncTransactions: boolean }) => {
      clearAuth();
      setStorageMode(StorageMode.LOCAL);
      if (params?.keepSyncTransactions && spreadsheetId && !isNil(sheetId)) {
        loadSyncRecords();
      }
      removeUserInfo();
    },
    [clearAuth, loadSyncRecords, setStorageMode, sheetId, spreadsheetId],
  );

  const verify = useCallback(async () => {
    try {
      if (!token) return false;
      await checkGoogleAuth(token);
      return true;
    } catch (err) {
      console.error(err);
      if (config.enableAuthService) {
        await refreshToken();
      } else {
        logout();
      }
      return false;
    }
  }, [checkGoogleAuth, logout, refreshToken, token]);

  return {
    token,
    isAuth,
    login: googleLogin,
    logout,
    verify,
    isAuthLoading,
  };
};
