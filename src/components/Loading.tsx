import { Icon } from "@components/Icon";
import { twMerge } from "tailwind-merge";

type Props = {
  isFullScreen?: boolean;
  className?: string;
  iconClassName?: string;
};

export const Loading = ({
  isFullScreen = false,
  className,
  iconClassName,
}: Props) => (
  <div
    className={twMerge(
      isFullScreen &&
        "absolute top-0 left-0 w-full h-full flex items-center justify-center",
      className
    )}
  >
    <Icon
      name="icon-[svg-spinners--3-dots-bounce]"
      role="status"
      className={twMerge("w-[65px] h-[65px]", iconClassName)}
    />
  </div>
);
