// ***********************************************
// This commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { Eip1193Bridge } from '@ethersproject/experimental/lib/eip1193-bridge';

const INFURA_KEY = Cypress.env('REACT_APP_INFURA_KEY');

if (typeof INFURA_KEY === 'undefined') {
  throw new Error(
    `REACT_APP_INFURA_KEY must be a defined environment variable`
  );
}

const TEST_PRIVATE_KEY = Cypress.env('WALLET_PRIVATE_KEY');

const rpcUrl = 'http://127.0.0.1:8545/';
const targetChainId = 31337;

// address of the above key
export const TEST_ADDRESS_NEVER_USE = new Wallet(TEST_PRIVATE_KEY).address;

class CustomizedBridge extends Eip1193Bridge {
  chainId = targetChainId;

  async sendAsync(...args) {
    console.debug('sendAsync called', ...args);
    return this.send(...args);
  }
  async send(...args) {
    console.debug('send called', ...args);
    const isCallbackForm =
      typeof args[0] === 'object' && typeof args[1] === 'function';
    let callback;
    let method;
    let params;
    if (isCallbackForm) {
      callback = args[1];
      method = args[0].method;
      params = args[0].params;
    } else {
      method = args[0];
      params = args[1];
    }
    if (method === 'eth_requestAccounts' || method === 'eth_accounts') {
      if (isCallbackForm) {
        callback({ result: [TEST_ADDRESS_NEVER_USE] });
      } else {
        return Promise.resolve([TEST_ADDRESS_NEVER_USE]);
      }
    }
    if (method === 'eth_chainId') {
      if (isCallbackForm) {
        callback(null, { result: '0x4' });
      } else {
        return Promise.resolve('0x4');
      }
    }
    try {
      const result = await super.send(method, params);
      console.debug('result received', method, params, result);
      if (isCallbackForm) {
        callback(null, { result });
      } else {
        return result;
      }
    } catch (error) {
      if (isCallbackForm) {
        callback(error, null);
      } else {
        throw error;
      }
    }
  }
}

// sets up the injected provider to be a mock ethereum provider with the given mnemonic/index
Cypress.Commands.overwrite('visit', (original, url, options) => {
  return original(
    url.startsWith('/') && url.length > 2 && !url.startsWith('/#')
      ? `/#${url}`
      : url,
    {
      ...options,
      onBeforeLoad(win) {
        options && options.onBeforeLoad && options.onBeforeLoad(win);
        win.localStorage.clear();
        const provider = new JsonRpcProvider(rpcUrl, targetChainId);
        const signer = new Wallet(TEST_PRIVATE_KEY, provider);
        win.ethereum = new CustomizedBridge(signer, provider);
      },
    }
  );
});
