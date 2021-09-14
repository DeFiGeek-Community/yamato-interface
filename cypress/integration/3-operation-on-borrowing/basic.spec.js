/// <reference types="cypress" />

const paramChangeStep = 1;

describe(
  'Basic operations on borrowing',
  {
    viewportHeight: 1600,
    viewportWidth: 2560,
  },
  () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('borrow CJPY', () => {
      const currentAmountSelector =
        '[data-testid=borrowing-data-currentAmount]';
      const actionAmountSelector = '[data-testid=borrowing-data-borrowAmount]';
      const actionTriggerSelector = '[data-testid=borrowing-act-borrow]';

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

    it('repayment CJPY', () => {
      const currentAmountSelector =
        '[data-testid=borrowing-data-currentAmount]';
      const actionAmountSelector = '[data-testid=borrowing-data-repayAmount]';
      const actionTriggerSelector = '[data-testid=borrowing-act-repay]';

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
