import { useMemo } from "react";
import type { MenuItemOption } from "./Menu";
import { useNavigate } from "react-router";
import { path } from "src/routes/constants/path";
import { useAuth } from "@hooks/useAuth";

export const useMenuItemOptions = (): MenuItemOption[] => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const options = useMemo(
    () => [
      {
        title: "Sheet Config",
        icon: "icon-[bxs--spreadsheet]",
        onClick: () => navigate(path.config),
      },
      {
        title: "Logout",
        icon: "icon-[material-symbols--logout]",
        onClick: logout,
      },
    ],
    [logout, navigate]
  );

  return options;
};
