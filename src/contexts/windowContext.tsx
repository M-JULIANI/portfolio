import React, { createContext, useContext, useEffect, useState } from "react";

export type WindowState = {
  width: number;
  height: number;
  mouseX: number;
  mouseY: number;
};

interface IHomeContext {
  windowState: WindowState;
  setWindowState: React.Dispatch<React.SetStateAction<WindowState>>;
}

// Create context making it potentially undefined
const HomeStateContext = createContext<IHomeContext | undefined>(undefined);

// Custom hook to use the home state
export const useHomeState = (): IHomeContext => {
  const context = useContext(HomeStateContext);
  if (!context) {
    throw new Error("useHomeState must be used within a HomeStateProvider");
  }
  return context;
};

// Provider component
const HomeStateProvider = (props: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [windowState, setWindowState] = useState<WindowState>({
    width: window.innerWidth,
    height: window.innerHeight,
    mouseX: 0,
    mouseY: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowState((prev) => ({
        ...prev,
        width: window.innerWidth,
        height: window.innerHeight,
      }));
    };

    const handleMouseMove = (event: MouseEvent) => {
      setWindowState((prev) => ({
        ...prev,
        mouseX: event.clientX,
        mouseY: event.clientY,
      }));
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <HomeStateContext.Provider value={{ windowState, setWindowState }}>
      {props.children}
    </HomeStateContext.Provider>
  );
};

export { HomeStateContext, HomeStateProvider };