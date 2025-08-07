import { useAuthStore } from "@/stores/authStore";
import { isAxiosError } from "axios";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { useState, useEffect } from "react";

type SheetOptions = {
  sheetId: string;
};

type AuthOptions = { apiKey?: string; token?: string };

export type GoogleSheetDocOptions = SheetOptions & AuthOptions;

export const useGoogleSheetDoc = ({
  sheetId,
  apiKey = "",
  token = "",
}: GoogleSheetDocOptions) => {
  const { setToken } = useAuthStore();
  const [doc, setDoc] = useState<GoogleSpreadsheet>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const onError = (err: any) => {
    console.error(err);
    setError(err);
    if (isAxiosError(err) && err.status === 401) {
      setToken(undefined);
    }
  };

  // Init doc
  useEffect(() => {
    const setup = async () => {
      try {
        setIsLoading(true);
        if (!apiKey && !token) {
          throw new Error("Missing apiKey or token for google authorization");
        }
        const _doc = new GoogleSpreadsheet(sheetId, {
          apiKey,
          token,
        });
        await _doc.loadInfo();
        setDoc(_doc);
      } catch (err) {
        onError(err);
      } finally {
        setIsLoading(false);
      }
    };
    setup();
  }, [apiKey, sheetId, token]);

  return { doc, isLoading, error };
};
