/// <reference types="cypress" />

const paramChangeStep = 1;

describe(
  'Basic operations on collateral',
  {
    viewportHeight: 1600,
    viewportWidth: 2560,
  },
  () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('deposit collateral', () => {
      const currentAmountSelector =
        '[data-testid=collateral-data-currentAmount]';
      const actionAmountSelector =
        '[data-testid=collateral-data-depositAmount]';
      const actionTriggerSelector = '[data-testid=collateral-act-deposit]';

      cy.get(currentAmountSelector)
        .invoke('text')
        .then((before) => {
          cy.get(actionAmountSelector)
            .invoke('val', paramChangeStep.toString())
            .trigger('change');
          cy.get(actionTriggerSelector).click();
          // cy.wait(1111);
          cy.get(currentAmountSelector)
            .invoke('text')
            .then((after) => {
              expect(parseFloat(after)).eq(
                parseFloat(before) + paramChangeStep
              );
            });
        });
    });

    it('withdraw collateral', () => {
      const currentAmountSelector =
        '[data-testid=collateral-data-currentAmount]';
      const actionAmountSelector =
        '[data-testid=collateral-data-withdrawalAmount]';
      const actionTriggerSelector = '[data-testid=collateral-act-withdraw]';

      cy.get(currentAmountSelector)
        .invoke('text')
        .then((before) => {
          cy.get(actionAmountSelector)
            .invoke('val', paramChangeStep.toString())
            .trigger('change');
          cy.get(actionTriggerSelector).click();
          // cy.wait(1111);
          cy.get(currentAmountSelector)
            .invoke('text')
            .then((after) => {
              expect(parseFloat(after)).eq(
                parseFloat(before) - paramChangeStep
              );
            });
        });
    });
  }
);
