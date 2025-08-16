import { useAuth } from "@hooks/useAuth";
import { useAuthStore, useSheetStore } from "@stores";
import { useQuery } from "@tanstack/react-query";
import {
  getDoc,
  getSheet,
  getSheetQueryKeys,
} from "@utils/googleSheet/helpers/spreadsheet";
import { isAxiosError } from "axios";

export const useGetSheetKey = ["sheet"];

export const useGetSheet = () => {
  const { token = "" } = useAuthStore();
  const { sheetId = "", sheetIndex } = useSheetStore();
  const { logout } = useAuth();

  return useQuery({
    queryKey: [...useGetSheetKey, token, sheetId, sheetIndex],
    queryFn: async () => {
      try {
        const doc = await getDoc({ token }, sheetId);
        const sheet = await getSheet(doc, sheetIndex);
        return sheet;
      } catch (err: unknown) {
        if (isAxiosError(err) && err.status === 401) {
          logout();
        }
        throw err;
      }
    },
  });
};

export const useGetSheetRowsKey = ["sheetRows"];

export const useGetSheetRows = () => {
  const {
    data: sheet,
    isFetched: isSheetFetched,
    isLoading: isSheetLoading,
  } = useGetSheet();

  const { isLoading: isQueryLoading, ...queryResult } = useQuery({
    queryKey: [...useGetSheetRowsKey, ...getSheetQueryKeys(sheet)],
    queryFn: async () => {
      if (!sheet) {
        throw new Error("Missing sheet");
      }
      const rows = await sheet?.getRows();
      return rows;
    },
    enabled: isSheetFetched,
  });

  return { isLoading: isQueryLoading || isSheetLoading, ...queryResult };
};
