/// <reference types="cypress" />

describe('Basic operations on borrowing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('borrow CJPY', () => {
    // !!WIP!!
    cy.get('[data-testid=borrowing-data-currentAmount]');
    cy.get('[data-testid=borrowing-data-borrowAmount]');
    cy.get('[data-testid=borrowing-act-borrow]');
  });

  it('repayment CJPY', () => {
    // !!WIP!!
    cy.get('[data-testid=borrowing-data-currentAmount]');
    cy.get('[data-testid=borrowing-data-repayAmount]');
    cy.get('[data-testid=borrowing-act-repay]');
  });
});
