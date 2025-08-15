import { Entry } from "@features/Entry/Entry";
import { ExpenseListPage } from "@pages/ExpenseListPage";
import { MenuPage } from "@pages/MenuPage";
import { SheetConfigPage } from "@pages/SheetConfigPage";
import { Routes, Route, Navigate } from "react-router";
import { path } from "src/routes/constants/path";
import { AuthGuard } from "src/routes/guards/AuthGuard";
import { ConfigGuard } from "src/routes/guards/ConfigGuard";
import { MainLayout } from "src/routes/layouts/MainLayout";

export const AppRouter = () => (
  <Routes>
    <Route element={<AuthGuard />}>
      <Route path="/login" element={<Entry />} />

      <Route path="/config" element={<SheetConfigPage />} />

      <Route element={<ConfigGuard />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ExpenseListPage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={path.expenseList} />} />
    </Route>
  </Routes>
);
