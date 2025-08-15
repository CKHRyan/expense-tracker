import { OverlayFabContext } from "./OverlayFabProvider";
import { useContext } from "react";

export const useOverlayFab = () => useContext(OverlayFabContext);
