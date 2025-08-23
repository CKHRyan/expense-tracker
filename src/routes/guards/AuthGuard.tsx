import { Loading } from "@components";
import { useAuth } from "@hooks/useAuth";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { path } from "src/routes/constants/path";

export const AuthGuard = () => {
  const { pathname } = useLocation();
  const { isAuth, isLoadingAuth, verify } = useAuth();

  useEffect(() => void verify(), [verify]);

  if (isLoadingAuth) return <Loading isFullScreen />;

  if (!isAuth && pathname !== path.login) {
    return <Navigate to={path.login} />;
  }

  if (isAuth && pathname === path.login) {
    return <Navigate to={path.expenseList} />;
  }

  return <Outlet />;
};
