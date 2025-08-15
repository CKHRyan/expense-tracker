import { Entry } from "@features/entry/Entry";
import { ExpenseListPage } from "@pages/ExpenseListPage";
import { SheetConfigPage } from "@pages/SheetConfigPage";
import { Routes, Route, Navigate } from "react-router";
import { path } from "src/routes/constants/path";
import { AuthGuard } from "src/routes/guards/AuthGuard";
import { ConfigGuard } from "src/routes/guards/ConfigGuard";

export const AppRouter = () => (
  <Routes>
    <Route element={<AuthGuard />}>
      <Route path="/login" element={<Entry />} />

      <Route path="/config" element={<SheetConfigPage />} />

      <Route element={<ConfigGuard />}>
        <Route path="/" element={<ExpenseListPage />} />
      </Route>

      <Route path="*" element={<Navigate to={path.expenseList} />} />
    </Route>
  </Routes>
);
