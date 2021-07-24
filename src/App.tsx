import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Index from './pages/index';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Index />
      </Route>
    </Switch>
  );
}

export default App;
