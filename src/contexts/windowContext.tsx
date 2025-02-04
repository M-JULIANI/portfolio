import React, { createContext, useContext, useEffect, useState, useRef } from "react";

export type WindowState = {
  singleColumn: boolean;
  isTouchDevice: boolean;
};

interface WindowRefs {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  width: React.MutableRefObject<number>;
  height: React.MutableRefObject<number>;
}

interface IHomeContext {
  windowState: WindowState;
  windowRefs: WindowRefs;
  setWindowState: React.Dispatch<React.SetStateAction<WindowState>>;
}

const HomeStateContext = createContext<IHomeContext | undefined>(undefined);

export const useHomeState = (): IHomeContext => {
  const context = useContext(HomeStateContext);
  if (!context) {
    throw new Error("useHomeState must be used within a HomeStateProvider");
  }
  return context;
};

const SMALL_BUFFER = 20;

const isOneCol = (w: number) => w >= 200 && w <= 640;
const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;
};

const HomeStateProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
  // refs for frequently changing values
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const widthRef = useRef(window.innerWidth);
  const heightRef = useRef(window.innerHeight);

  // state for values that should trigger re-renders
  const [windowState, setWindowState] = useState<WindowState>({
    singleColumn: isOneCol(window.innerWidth),
    isTouchDevice: isTouchDevice(),
  });

  useEffect(() => {
    const handleResize = () => {
      widthRef.current = window.innerWidth;
      heightRef.current = window.innerHeight;

      // Only update state for layout-affecting changes
      setWindowState((prev) => ({
        ...prev,
        singleColumn: isOneCol(window.innerWidth),
      }));
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (Math.abs(event.clientX - mouseXRef.current) < SMALL_BUFFER) return;
      if (Math.abs(event.clientY - mouseYRef.current) < SMALL_BUFFER) return;

      mouseXRef.current = event.clientX;
      mouseYRef.current = event.clientY;
    };

    window.addEventListener("resize", handleResize);

    if (!isTouchDevice() && window.matchMedia("(hover: hover)").matches) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const windowRefs: WindowRefs = {
    mouseX: mouseXRef,
    mouseY: mouseYRef,
    width: widthRef,
    height: heightRef,
  };

  return (
    <HomeStateContext.Provider value={{ windowState, windowRefs, setWindowState }}>
      {props.children}
    </HomeStateContext.Provider>
  );
};

export { HomeStateContext, HomeStateProvider };
