import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { isNil } from "lodash";

export const getDoc = async (
  { apiKey, token = "" }: { apiKey?: string; token?: string },
  sheetId?: string
) => {
  if (!apiKey && !token) {
    throw new Error("Missing apiKey or token for google authorization");
  }
  if (!sheetId) {
    throw new Error("Missing sheet Id");
  }
  const doc = new GoogleSpreadsheet(sheetId, {
    apiKey,
    token,
  });
  await doc.loadInfo();
  return doc;
};

export const getSheet = async (doc: GoogleSpreadsheet, sheetIndex?: number) => {
  if (isNil(sheetIndex)) {
    throw new Error("Missing sheet index");
  }
  const sheet = doc.sheetsByIndex[sheetIndex];
  await sheet.loadHeaderRow();
  return sheet;
};

export const getSheetQueryKeys = (sheet?: GoogleSpreadsheetWorksheet) => {
  if (!sheet) return [];

  const sheetId = sheet._spreadsheet.spreadsheetId;
  const sheetIndex = sheet.index;
  return [sheetId, sheetIndex];
};

export const getSheetRowsQueryKeys = (
  sheetRows?: GoogleSpreadsheetRow<Record<string, any>>[]
) => {
  if (!sheetRows) return [];

  const sheetRowsLength = sheetRows.length;
  const sheetQueryKeys =
    sheetRowsLength > 0 ? getSheetQueryKeys(sheetRows[0]._worksheet) : [];
  return [sheetRowsLength, ...sheetQueryKeys];
};
