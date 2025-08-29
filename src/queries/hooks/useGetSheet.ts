import { useAuth } from "@hooks/useAuth";
import { useAuthStore, useSheetStore } from "@stores";
import { useQuery } from "@tanstack/react-query";
import {
  getDoc,
  getSheet,
  getSheetQueryKeys,
} from "@utils/google/googleSheet/helpers/spreadsheet";
import { isAxiosError } from "axios";
import type { QueryOptions } from "src/queries/types";

export const useGetSheetKey = ["sheet"];

export const useGetSheet = () => {
  const { token = "" } = useAuthStore();
  const { spreadsheetId = "", sheetId } = useSheetStore();
  const { logout } = useAuth();

  return useQuery({
    queryKey: [...useGetSheetKey, token, spreadsheetId, sheetId],
    queryFn: async () => {
      try {
        const doc = await getDoc({ token }, spreadsheetId);
        const sheet = await getSheet(doc, sheetId);
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

export const useGetDocKey = ["doc"];

export const useGetDoc = (
  spreadsheetId: string,
  { skip = false }: QueryOptions
) => {
  const { token = "" } = useAuthStore();
  const { logout } = useAuth();

  return useQuery({
    queryKey: [...useGetSheetKey, token, spreadsheetId],
    queryFn: async () => {
      try {
        const doc = await getDoc({ token }, spreadsheetId);
        return doc;
      } catch (err: unknown) {
        if (isAxiosError(err) && err.status === 401) {
          logout();
        }
        throw err;
      }
    },
    enabled: !skip,
  });
};
