/// <reference types="cypress" />

describe('visit interface pages', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'));
  });

  it('visit top page and check title', () => {
    cy.title().should('equal', 'Yamato Interface');
  });
});
