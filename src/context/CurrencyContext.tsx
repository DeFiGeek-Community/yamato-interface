import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from 'react';
import {  useLocation } from 'react-router-dom';

type CurrencyContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const [currency, setCurrency] = useState<string>('CJPY');

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes('/cjpy')) {
      setCurrency('CJPY');
    } else if (path.includes('/cusd')) {
      setCurrency('CUSD');
    } else if (path.includes('/ceur')) {
      setCurrency('CEUR');
    }
  }, [location.pathname, setCurrency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
