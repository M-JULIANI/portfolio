import React, { createContext, useContext, useEffect, useState } from "react";

interface IHomeContext {
  windowState: { singleColumn: boolean };
}

const HomeStateContext = createContext<IHomeContext | undefined>(undefined);

export const useHomeState = (): IHomeContext => {
  const context = useContext(HomeStateContext);
  if (!context) throw new Error("useHomeState must be used within a HomeStateProvider");
  return context;
};

const isOneCol = (w: number) => w >= 200 && w <= 640;

const HomeStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [singleColumn, setSingleColumn] = useState(isOneCol(window.innerWidth));

  useEffect(() => {
    const handleResize = () => setSingleColumn(isOneCol(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <HomeStateContext.Provider value={{ windowState: { singleColumn } }}>
      {children}
    </HomeStateContext.Provider>
  );
};

export { HomeStateProvider };
