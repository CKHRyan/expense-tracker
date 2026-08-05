import { Outlet } from "react-router";
import { Title } from "../Title";
import { Icon } from "../Icon";
import type { TopNavBarButtonProps } from "./type";
import { twMerge } from "tailwind-merge";
import { useComponentSize } from "src/helpers/useComponentSize";
import { INITIAL_NAVBAR_BUTTON_WIDTH } from "./constants";

type Props = {
  title: string;
  titleClassName?: string;
  leftButtonProps?: TopNavBarButtonProps;
};

export const TopNavBar = ({
  title,
  titleClassName,
  leftButtonProps,
}: Props) => {
  const { width: leftButtonWidth, ref: leftButtonRef } = useComponentSize();

  const navbarButtonWidth = leftButtonWidth || INITIAL_NAVBAR_BUTTON_WIDTH;

  return (
    <div>
      <div className="p-4 w-full h-[3.55rem] gap-4 flex flex-row items-center bg-[#252525] drop-shadow-[0_0px_10px_rgba(255,255,255,0.08)]">
        <div style={{ width: navbarButtonWidth }}>
          {leftButtonProps && (
            <Icon
              ref={leftButtonRef}
              name={leftButtonProps.iconName}
              onClick={leftButtonProps.onClick}
              className={leftButtonProps.className}
            />
          )}
        </div>
        <Title
          className={twMerge("text-xl flex-1 text-center", titleClassName)}
        >
          {title}
        </Title>
        <div style={{ width: navbarButtonWidth }} />
      </div>
      <Outlet />
    </div>
  );
};
