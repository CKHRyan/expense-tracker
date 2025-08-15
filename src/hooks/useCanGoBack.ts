import { useLocation } from "react-router";

export const useCanGoBack = () => {
  const location = useLocation();
  return location.key !== "default";
};
