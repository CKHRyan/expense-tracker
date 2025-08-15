import { useAuthStore } from "@stores";
import { Navigate, Outlet, useLocation } from "react-router";
import { path } from "src/routes/constants/path";

export const AuthGuard = () => {
  const { pathname } = useLocation();
  const { token } = useAuthStore();

  const isAuth = !!token;

  if (!isAuth && pathname !== path.login) {
    return <Navigate to={path.login} />;
  }

  if (isAuth && pathname === path.login) {
    return <Navigate to={path.expenseList} />;
  }

  return <Outlet />;
};
