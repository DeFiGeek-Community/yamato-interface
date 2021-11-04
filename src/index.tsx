import { ChakraProvider } from '@chakra-ui/react';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { NetworkContextName } from './constants/misc';
import reportWebVitals from './reportWebVitals';
import store from './state';
import ThemeProvider, { ThemedGlobalStyle } from './theme';
import getLibrary from './utils/getLibrary';

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

const { ethereum } = window;
if (!!ethereum) {
  ethereum.autoRefreshOnNetworkChange = false;
}

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <ThemeProvider>
            <ChakraProvider>
              <Provider store={store}>
                <ThemedGlobalStyle />
                <App />
              </Provider>
            </ChakraProvider>
          </ThemeProvider>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
