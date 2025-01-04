import { useState, useCallback } from "react";
import { ReloadContext } from "@/contexts/ReloadContext";

interface ReloadContextProviderProps {
  children: any;
}

export const ReloadContextProvider: React.FC<ReloadContextProviderProps> = ({
  children,
}) => {
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => {
    setReloadKey((reloadKey) => reloadKey + 1);
  }, []);
  return (
    <ReloadContext.Provider value={{ reload, reloadKey }}>
      {children}
    </ReloadContext.Provider>
  );
};
