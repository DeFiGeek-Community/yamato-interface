/// <reference types="cypress" />

describe('visit interface pages', () => {
  it('visit top page', () => {
    cy.visit(Cypress.env('baseUrl'))
    cy.title().should('equal', 'Yamato Interface')
  })
})
