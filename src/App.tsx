import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Web3ReactManager from './components/Web3ReactManager';
import Index from './pages/index';
import MarketUpdater from './state/market/updater';

function App() {
  return (
    <Web3ReactManager>
      <>
        <MarketUpdater />
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
        </Switch>
      </>
    </Web3ReactManager>
  );
}

export default App;
