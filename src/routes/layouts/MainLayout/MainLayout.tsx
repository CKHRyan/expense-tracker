import { BottomNavTabs } from "@components";
import { OverlayFabProvider } from "@components/Fab";
import { Outlet } from "react-router";
import { useBottomNavTabItemOptions } from "src/routes/layouts/MainLayout/hooks";

export const MainLayout = () => {
  const navTabItemOptions = useBottomNavTabItemOptions();

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 relative overflow-hidden">
        <OverlayFabProvider>
          <div className="h-full overflow-auto">
            <Outlet />
          </div>
        </OverlayFabProvider>
      </div>
      <BottomNavTabs items={navTabItemOptions} />
    </div>
  );
};
