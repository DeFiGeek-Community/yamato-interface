import { createContext, useContext } from "react";

export type WalletBalanceContextType = {
  ethBalance: string | null;
  cjpyBalance: string | null;
  reloadBalances: () => void;
};

export const WalletBalanceContext = createContext<WalletBalanceContextType>({
  ethBalance: "0",
  cjpyBalance: "0",
  reloadBalances: () => {},
});

export const useWalletBalanceContext = (): WalletBalanceContextType => {
  return useContext(WalletBalanceContext);
};
