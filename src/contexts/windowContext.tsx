import React, { createContext, useContext, useEffect, useState, useRef } from "react";

export type WindowState = {
  singleColumn: boolean;
  isTouchDevice: boolean;
};

interface WindowRefs {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  mousePosition: { x: number; y: number };
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
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const widthRef = useRef(window.innerWidth);
  const heightRef = useRef(window.innerHeight);

  const [windowState, setWindowState] = useState<WindowState>({
    singleColumn: isOneCol(window.innerWidth),
    isTouchDevice: isTouchDevice(),
  });

  useEffect(() => {
    const handleResize = () => {
      widthRef.current = window.innerWidth;
      heightRef.current = window.innerHeight;

      setWindowState((prev) => ({
        ...prev,
        singleColumn: isOneCol(window.innerWidth),
      }));
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (Math.abs(event.clientX - mouseX.current) < SMALL_BUFFER) return;
      if (Math.abs(event.clientY - mouseY.current) < SMALL_BUFFER) return;

      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    };

    let animationFrameId: number;
    const animate = () => {
      setMousePosition({
        x: mouseX.current,
        y: mouseY.current,
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", handleResize);

    if (!isTouchDevice() && window.matchMedia("(hover: hover)").matches) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const windowRefs: WindowRefs = {
    mouseX,
    mouseY,
    mousePosition,
    width: widthRef,
    height: heightRef,
  };

  const value = {
    windowState,
    windowRefs,
    setWindowState,
  };

  return <HomeStateContext.Provider value={value}>{props.children}</HomeStateContext.Provider>;
};

export { HomeStateContext, HomeStateProvider };
