import type { FabProps } from "../Fab";
import { useOverlayFab } from "./hooks";
import { useEffect } from "react";

export const OverlayFab = (props: FabProps) => {
  const { setFab } = useOverlayFab();

  useEffect(() => {
    setFab(true, props);
    return () => setFab(false);
  }, [props, setFab]);

  return null;
};
