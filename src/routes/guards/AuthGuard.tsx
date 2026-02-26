import { Loading } from "@components";
import { StorageMode } from "@features/ExpenseInput/types";
import { useAuth } from "@hooks/useAuth";
import { useAppStore } from "@stores";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { path } from "src/routes/constants/path";

export const AuthGuard = () => {
  const { pathname } = useLocation();
  const { isAuth, isAuthLoading, verify } = useAuth();
  const { storageMode } = useAppStore();

  useEffect(() => {
    verify();
  }, [verify]);

  if (isAuthLoading) {
    return <Loading isFullScreen />;
  }

  if (isAuth && pathname === path.login) {
    return <Navigate to={path.expenseList} />;
  }

  if (storageMode === StorageMode.SHEET && !isAuth && pathname !== path.login) {
    return <Navigate to={path.login} />;
  }

  return <Outlet />;
};
