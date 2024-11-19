import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import './i18n/configs';
import Web3ReactManager from './components/Web3ReactManager';
import { useCurrency } from './context/CurrencyContext';
import Index from './pages/index';
import Tools from './pages/tools';
import ApplicationUpdater from './state/application/updater';
import MarketUpdater from './state/market/updater';
import MulticallUpdater from './state/multicall/updater';
import PledgeUpdater from './state/pledge/updater';
import TransactionsUpdater from './state/transactions/updater';
import WalletUpdater from './state/wallet/updater';
import YamatoEntiretyUpdater from './state/yamato-entirety/updater';

function App() {
  const location = useLocation();
  const { setCurrency } = useCurrency();

  useEffect(() => {
    // パスに基づいて通貨を設定（小文字に変換）
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
    <Web3ReactManager>
      <>
        <ApplicationUpdater />
        <MulticallUpdater />
        <TransactionsUpdater />
        <MarketUpdater />
        <YamatoEntiretyUpdater />
        <PledgeUpdater />
        <WalletUpdater />
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route exact path="/cjpy">
            <Index />
          </Route>
          <Route exact path="/cusd">
            <Index />
          </Route>
          <Route exact path="/ceur">
            <Index />
          </Route>
          <Route exact path="/tools/">
            <Tools />
          </Route>
          {/* 他のルートを追加する場合はここに */}
        </Switch>
      </>
    </Web3ReactManager>
  );
}

export default App;