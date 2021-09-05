/// <reference types="cypress" />

describe('Basic operations on collateral', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deposit collateral', () => {
    // !!WIP!!
    cy.contains('預入実行');
  });

  it('withdraw collateral', () => {
    // !!WIP!!
    cy.contains('引出実行');
  });
});
