/// <reference types="cypress" />

const paramChangeStep = 1;
const waitMillisec = 5000;

describe(
  'Basic operations on collateral',
  {
    viewportHeight: 1600,
    viewportWidth: 2560,
  },
  () => {
    let step1Amount;
    let step2Amount;
    let step3Amount;
    let step4Amount;

    beforeEach(() => {
      cy.visit('/');
    });

    it('deposit collateral', () => {
      const currentAmountSelector =
        '[data-testid=collateral-data-currentAmount]';
      const actionAmountSelector =
        '[data-testid=collateral-data-depositAmount]';
      const actionTriggerSelector = '[data-testid=collateral-act-deposit]';

      cy.wait(waitMillisec);
      cy.get(currentAmountSelector)
        .invoke('text')
        .then((before) => {
          step1Amount = parseFloat(before.replace(/[^0-9]/g, ''));
          cy.get(actionAmountSelector)
            .invoke('val', paramChangeStep)
            .trigger('change');
          cy.get(actionTriggerSelector).click();
          cy.wait(waitMillisec);
          cy.get(currentAmountSelector)
            .invoke('text')
            .then((after) => {
              step2Amount = parseFloat(after.replace(/[^0-9]/g, ''));
              expect(step2Amount).eq(step1Amount + paramChangeStep);
            });
        });
    });

    it('withdraw collateral', () => {
      const currentAmountSelector =
        '[data-testid=collateral-data-currentAmount]';
      const actionAmountSelector =
        '[data-testid=collateral-data-withdrawalAmount]';
      const actionTriggerSelector = '[data-testid=collateral-act-withdraw]';

      cy.wait(waitMillisec);
      cy.get(currentAmountSelector)
        .invoke('text')
        .then((before) => {
          step3Amount = parseFloat(before.replace(/[^0-9]/g, ''));
          // expect(step3Amount).eq(step2Amount);
          cy.get(actionAmountSelector)
            .invoke('val', paramChangeStep)
            .trigger('change');
          cy.get(actionTriggerSelector).click();
          cy.wait(waitMillisec);
          cy.get(currentAmountSelector)
            .invoke('text')
            .then((after) => {
              step4Amount = parseFloat(after.replace(/[^0-9]/g, ''));
              expect(step4Amount).eq(step3Amount - paramChangeStep);
            });
        });
    });
  }
);
