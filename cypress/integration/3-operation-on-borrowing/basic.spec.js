/// <reference types="cypress" />

describe('Basic operations on borrowing', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'));
  });

  it('borrow CJPY', () => {
    // !!WIP!!
    cy.contains('借入実行');
  });

  it('repayment CJPY', () => {
    // !!WIP!!
    cy.contains('返済実行');
  });
});
