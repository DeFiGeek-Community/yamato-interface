/// <reference types="cypress" />

import { connectWallet } from '../../support/commands';

describe('visit interface pages', () => {
  const walletConnectWalletSelector = '[data-testid=wallet-data-connectWallet]';
  const walletConnectedAsSelector = '[data-testid=wallet-data-connectedAs]';

  it('visit top page and check title', () => {
    cy.visit('/');
    cy.title().should('equal', 'Yamato Protocol Interface');
  });

  it('visit without wallet and check connected', () => {
    cy.visit('/');
    cy.get(walletConnectWalletSelector).contains('Connect Wallet');
  });

  it('visit with wallet and check connected', () => {
    connectWallet();
    cy.visit('/');
    cy.get(walletConnectedAsSelector).contains('Connected As');
  });
});
