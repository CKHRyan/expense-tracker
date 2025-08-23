import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { isNil } from "lodash";

export const getDoc = async (
  { apiKey, token = "" }: { apiKey?: string; token?: string },
  spreadsheetId?: string
) => {
  if (!apiKey && !token) {
    throw new Error("Missing apiKey or token for google authorization");
  }
  if (!spreadsheetId) {
    throw new Error("Missing spreadsheetId Id");
  }
  const doc = new GoogleSpreadsheet(spreadsheetId, {
    apiKey,
    token,
  });
  await doc.loadInfo();
  return doc;
};

export const getSheet = async (doc: GoogleSpreadsheet, sheetId?: number) => {
  if (isNil(sheetId)) {
    throw new Error("Missing sheet index");
  }
  const sheet = doc.sheetsById[sheetId];
  await sheet.loadHeaderRow();
  return sheet;
};

export const getSheetQueryKeys = (sheet?: GoogleSpreadsheetWorksheet) => {
  if (!sheet) return [];

  const spreadsheetId = sheet._spreadsheet.spreadsheetId;
  const sheetId = sheet.sheetId;
  return [spreadsheetId, sheetId];
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
