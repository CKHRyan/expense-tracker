import { BottomNavTabs } from "@components";
import { OverlayFabProvider } from "@components/Fab";
import { Outlet } from "react-router";
import { bottomNavTabItemOptions } from "src/routes/layouts/MainLayout/constants";

export const MainLayout = () => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 relative overflow-hidden">
        <OverlayFabProvider>
          <div className="h-full overflow-auto">
            <Outlet />
          </div>
        </OverlayFabProvider>
      </div>
      <BottomNavTabs items={bottomNavTabItemOptions} />
    </div>
  );
};
