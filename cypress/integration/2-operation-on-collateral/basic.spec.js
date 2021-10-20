/// <reference types="cypress" />

const paramChangeStep = 1;
const visitWaitMillisec = 10000;
const txWaitMilliSec = 50000;

describe(
  'Basic operations on collateral',
  {
    viewportHeight: 936,
    viewportWidth: 1024,
  },
  () => {
    const currentAmountSelector = '[data-testid=collateral-data-currentAmount]';
    let step1Amount;
    let step2Amount;
    let step3Amount;
    let step4Amount;

    beforeEach(() => {
      cy.visit('/');
    });

    it('deposit collateral', () => {
      const actionAmountSelector =
        '[data-testid=collateral-data-depositAmount]';
      const actionTriggerSelector = '[data-testid=collateral-act-deposit]';

      cy.wait(visitWaitMillisec);
      cy.get(currentAmountSelector)
        .invoke('text')
        .then((before) => {
          step1Amount = parseFloat(before.replace(/[^0-9]/g, ''));
          cy.get(actionAmountSelector).clear();
          cy.get(actionAmountSelector).type(paramChangeStep.toString());
          cy.get(actionTriggerSelector).click();
          cy.wait(txWaitMilliSec);
          cy.get(currentAmountSelector)
            .invoke('text')
            .then((after) => {
              step2Amount = parseFloat(after.replace(/[^0-9]/g, ''));
              expect(step2Amount).eq(step1Amount + paramChangeStep);
            });
        });
    });

    it('withdraw collateral', () => {
      const actionAmountSelector =
        '[data-testid=collateral-data-withdrawalAmount]';
      const actionTriggerSelector = '[data-testid=collateral-act-withdraw]';

      cy.wait(visitWaitMillisec);
      cy.get(currentAmountSelector)
        .invoke('text')
        .then((before) => {
          step3Amount = parseFloat(before.replace(/[^0-9]/g, ''));
          cy.get(actionAmountSelector).clear();
          cy.get(actionAmountSelector).type(paramChangeStep.toString());
          cy.get(actionTriggerSelector).click();
          cy.wait(txWaitMilliSec);
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
