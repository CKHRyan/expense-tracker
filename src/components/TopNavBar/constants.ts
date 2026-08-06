import type { TopNavBarButtonProps } from "./types";

export const INITIAL_NAVBAR_BUTTON_WIDTH = 40;

export const BackButtonProps: TopNavBarButtonProps = {
  iconName: "icon-[material-symbols--chevron-left-rounded]",
  onClick: () => window.history.back(),
  className: "text-4xl",
};
