import { useOverlayFab } from "@components/Fab/OverlayFab/hooks";
import { Fab, type FabProps } from "../Fab";
import { createContext, useState, type ReactNode } from "react";

type OverlayFabContextType = {
  isRender: boolean;
  fabProps?: FabProps;
  setFab: (isRender: boolean, props?: FabProps) => void;
};

const initialValues: OverlayFabContextType = {
  isRender: false,
  setFab: () => {},
};

export const OverlayFabContext =
  createContext<OverlayFabContextType>(initialValues);

const FabContainer = () => {
  const { isRender, fabProps } = useOverlayFab();

  if (!isRender) return null;

  return <Fab {...fabProps} />;
};

type Props = { children?: ReactNode };

export const OverlayFabProvider = ({ children }: Props) => {
  const [isRender, setIsRender] = useState(false);
  const [fabProps, setFabProps] = useState<FabProps>();

  const setFab: NonNullable<OverlayFabContextType["setFab"]> = (
    isRender,
    fabProps,
  ) => {
    setIsRender(isRender);
    setFabProps(fabProps);
  };

  const contextValue = { isRender, fabProps, setFab };

  return (
    <OverlayFabContext value={contextValue}>
      {children}
      <FabContainer />
    </OverlayFabContext>
  );
};
