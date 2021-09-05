/// <reference types="cypress" />

describe('Basic operations on collateral', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'));
  });

  it('deposit collateral', () => {
    // !!TODO!!
    cy.contains('預入実行');
  });

  it('withdraw collateral', () => {
    // !!WIP!!
    cy.contains('引出実行');
  });
});
