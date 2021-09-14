/// <reference types="cypress" />

describe('Basic operations on collateral', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deposit collateral', () => {
    // !!WIP!!
    cy.get('[data-testid=collateral-data-currentAmount]');
    cy.get('[data-testid=collateral-data-depositAmount]');
    cy.get('[data-testid=collateral-act-deposit]');
  });

  it('withdraw collateral', () => {
    // !!WIP!!
    cy.get('[data-testid=collateral-data-currentAmount]');
    cy.get('[data-testid=collateral-data-withdrawalAmount]');
    cy.get('[data-testid=collateral-act-withdraw]');
  });
});
