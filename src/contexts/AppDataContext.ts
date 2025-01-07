import { createContext, useContext } from "react";

export interface AppDataContextType {
  chainId: number;
  ethPrice: bigint;
}

export const AppDataContext = createContext<AppDataContextType | undefined>(
  undefined
);

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error("useAppData must be used within a AppDataProvider");
  }
  return context;
};

export default AppDataContext;
