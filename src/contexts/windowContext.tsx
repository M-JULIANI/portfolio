import React, { createContext, useContext, useEffect, useState } from "react";
export type WindowState = {
  width: number;
  height: number;
  mouseX: number;
  mouseY: number;
  singleColumn: boolean;
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

const SMALL_BUFFER = 20;

const isOneCol = (w: number) => w >= 200 && w < 488;
// Provider component
const HomeStateProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
  const [windowState, setWindowState] = useState<WindowState>({
    width: window.innerWidth,
    height: window.innerHeight,
    mouseX: 0,
    mouseY: 0,
    singleColumn: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowState((prev) => ({
        ...prev,
        width: window.innerWidth,
        height: window.innerHeight,
        singleColumn: isOneCol(window.innerWidth),
      }));
    };

    const isTouch = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore - Some browsers might not support this
        navigator.msMaxTouchPoints > 0
      );
    };

    // Combined mouse movement logic with buffer
    const handleMouseMove = (event: MouseEvent) => {
      if (Math.abs(event.clientX - windowState.mouseX) < SMALL_BUFFER) return;
      if (Math.abs(event.clientY - windowState.mouseY) < SMALL_BUFFER) return;

      setWindowState((prev) => ({
        ...prev,
        mouseX: event.clientX,
        mouseY: event.clientY,
        singleColumn: isOneCol(window.innerWidth),
      }));
    };

    window.addEventListener("resize", handleResize);

    // Only add mouse tracking for non-touch devices
    if (!isTouch() && window.matchMedia("(hover: hover)").matches) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <HomeStateContext.Provider value={{ windowState, setWindowState }}>{props.children}</HomeStateContext.Provider>
  );
};

export { HomeStateContext, HomeStateProvider };
