import { createContext, useContext } from "react";

export type ReloadContextType = {
  reload: () => void;
  reloadKey: number;
};

export const ReloadContext = createContext<ReloadContextType>({
  reload: () => {},
  reloadKey: 0,
});

export const useReload = (): ReloadContextType => {
  return useContext(ReloadContext);
};