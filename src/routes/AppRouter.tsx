import { Entry } from "@features/Entry/Entry";
import { StorageMode } from "@features/ExpenseInput/types";
import { AnalysisPage } from "@pages/AnalysisPage";
import { ExpenseListPage } from "@pages/ExpenseListPage";
import { MenuPage } from "@pages/MenuPage";
import { SheetConfigPage } from "@pages/SheetConfigPage";
import { useAppStore } from "@stores";
import { Routes, Route, Navigate, Outlet } from "react-router";
import { path } from "src/routes/constants/path";
import { AuthGuard } from "src/routes/guards/AuthGuard";
import { ConfigGuard } from "src/routes/guards/ConfigGuard";
import { MainLayout } from "src/routes/layouts/MainLayout";

export const AppRouter = () => {
  const { storageMode } = useAppStore();
  return (
    <Routes>
      <Route
        element={storageMode === StorageMode.SHEET ? <AuthGuard /> : <Outlet />}
      >
        <Route path={path.login} element={<Entry />} />

        <Route path={path.config} element={<SheetConfigPage />} />

        <Route
          element={
            storageMode === StorageMode.SHEET ? <ConfigGuard /> : <Outlet />
          }
        >
          <Route element={<MainLayout />}>
            <Route path={path.expenseList} element={<ExpenseListPage />} />
            <Route path={path.analysis} element={<AnalysisPage />} />
            <Route path={path.menu} element={<MenuPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={path.expenseList} />} />
      </Route>
    </Routes>
  );
};
