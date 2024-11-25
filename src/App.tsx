import { Switch, Route } from 'react-router-dom';
import './i18n/configs';
import Web3ReactManager from './components/Web3ReactManager';
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
