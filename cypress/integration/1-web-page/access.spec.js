/// <reference types="cypress" />

describe('visit interface pages', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('visit top page and check title', () => {
    cy.title().should('equal', 'Yamato Protocol Interface');
  });
});
