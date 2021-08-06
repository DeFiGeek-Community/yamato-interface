import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Web3ReactManager from './components/Web3ReactManager';
import Index from './pages/index';

function App() {
  return (
    <Web3ReactManager>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
      </Switch>
    </Web3ReactManager>
  );
}

export default App;
