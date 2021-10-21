/// <reference types="cypress" />

import { connectWallet } from '../../support/commands';

connectWallet();

describe('visit interface pages', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('visit top page and check title', () => {
    cy.title().should('equal', 'Yamato Protocol Interface');
  });
});
