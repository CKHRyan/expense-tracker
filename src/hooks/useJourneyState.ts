import { useAuthStore, useSheetStore } from "@stores";
import { isNil } from "lodash";
import { useMemo } from "react";

export const JourneyState = {
  Auth: "auth",
  Config: "config",
  Onboarded: "onboarded",
};

export const useJourneyState = () => {
  const { token } = useAuthStore();
  const { sheetId, sheetIndex } = useSheetStore();

  const state = useMemo(() => {
    if (!token) return JourneyState.Auth;
    if (!sheetId || isNil(sheetIndex)) return JourneyState.Config;
    return JourneyState.Onboarded;
  }, [sheetId, sheetIndex, token]);

  return state;
};
