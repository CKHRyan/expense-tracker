import { Button, FormInput, Title } from "@components";
import { useSheetStore } from "@stores";
import { isNil } from "lodash";
import { useCallback, useState } from "react";

export const SheetConfigPage = () => {
  const { sheetId, sheetIndex, setSheetId, setSheetIndex } = useSheetStore();
  const [_sheetId, _setSheetId] = useState(sheetId ?? "");
  const [_sheetIndex, _setSheetIndex] = useState<number | undefined>(
    sheetIndex
  );

  const onLoad = useCallback(() => {
    try {
      if (!_setSheetId || isNil(_sheetIndex)) {
        throw new Error("Missing required sheet data");
      }
      setSheetId(_sheetId);
      setSheetIndex(_sheetIndex);
    } catch (e) {
      alert(e);
    }
  }, [_sheetId, _sheetIndex, setSheetId, setSheetIndex]);

  return (
    <div className="p-8 flex flex-col gap-10">
      <Title>Sheet Parameters</Title>
      <div className="flex flex-col gap-6">
        <FormInput
          id="sheetId"
          label="Spreadsheet Id"
          required
          value={_sheetId}
          onChange={(e) => _setSheetId(e.target.value)}
        />
        <FormInput
          id="sheetId"
          label="Main sheet Index"
          type="number"
          required
          min={0}
          value={_sheetIndex}
          onChange={(e) => _setSheetIndex(Number(e.target.value))}
        />
      </div>
      <Button onClick={onLoad}>LOAD RECORDS</Button>
    </div>
  );
};
