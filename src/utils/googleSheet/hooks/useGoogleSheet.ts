import { useEffect, useState } from "react";
import type {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { isNil } from "lodash";

type Params = { doc?: GoogleSpreadsheet; sheetIndex?: number };

export const useGoogleSheet = ({ doc, sheetIndex }: Params) => {
  const [sheet, setSheet] = useState<GoogleSpreadsheetWorksheet>();
  const [headers, setHeaders] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    if (!doc || isNil(sheetIndex)) return;

    const setup = async () => {
      try {
        setIsLoading(true);
        const sheet = doc.sheetsByIndex[sheetIndex];
        setSheet(sheet);
        await sheet.loadHeaderRow();
        setHeaders(sheet.headerValues);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    setup();
  }, [doc, sheetIndex]);

  return { sheet, headers, isLoading, error };
};
