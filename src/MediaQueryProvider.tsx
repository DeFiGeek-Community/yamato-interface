import React, { createContext, FC, useContext, useMemo } from 'react';
import useMedia from 'use-media';

type Props = {
  children: React.ReactNode;
};

type Context = {
  isMobileSite: boolean;
  isTabletSite: boolean;
  isPcSite: boolean;
};

const MediaQueryContext = createContext<Context>({
  isMobileSite: false,
  isTabletSite: false,
  isPcSite: true,
});

const mediaQueries = {
  mobile: '(max-width: 519px)',
  tablet: '(min-width: 520px) and (max-width: 959px)',
  pc: '(min-width: 960px)',
};

export const MediaQueryProvider: FC<Props> = ({ children }: Props) => {
  const isMobileSite = useMedia(mediaQueries.mobile);
  const isTabletSite = useMedia(mediaQueries.tablet);
  const isPcSite = useMedia(mediaQueries.pc);
  const value = useMemo(
    () => ({ isMobileSite, isTabletSite, isPcSite }),
    [isMobileSite, isTabletSite, isPcSite]
  );

  return (
    <MediaQueryContext.Provider value={value}>
      {children}
    </MediaQueryContext.Provider>
  );
};

export const useMediaQueryContext = (): Context =>
  useContext(MediaQueryContext);
