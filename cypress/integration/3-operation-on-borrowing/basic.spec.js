/// <reference types="cypress" />

const paramChangeStep = 1000;
const visitWaitMillisec = 10000;
const txWaitMilliSec = 50000;

describe(
  'Basic operations on borrowing',
  {
    viewportHeight: 936,
    viewportWidth: 1024,
  },
  () => {
    const currentAmountSelector = '[data-testid=borrowing-data-currentAmount]';
    let step1Amount;
    let step2Amount;
    let step3Amount;
    let step4Amount;
    let step5Amount;
    let step6Amount;
    let step7Amount;
    let step8Amount;

    before(() => {
      // deposit
      const currentAmountSelector =
        '[data-testid=collateral-data-currentAmount]';
      const actionAmountSelector =
        '[data-testid=collateral-data-depositAmount]';
      const actionTriggerSelector = '[data-testid=collateral-act-deposit]';
      const paramChangeStep = 1;

      cy.visit('/');
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

    beforeEach(() => {
      cy.visit('/');
    });

    it('borrow CJPY', () => {
      const actionAmountSelector = '[data-testid=borrowing-data-borrowAmount]';
      const actionTriggerSelector = '[data-testid=borrowing-act-borrow]';

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
              expect(step4Amount).eq(step3Amount + paramChangeStep);
            });
        });
    });

    it('repayment CJPY', () => {
      const actionAmountSelector = '[data-testid=borrowing-data-repayAmount]';
      const actionTriggerSelector = '[data-testid=borrowing-act-repay]';

      cy.wait(visitWaitMillisec);
      cy.get(currentAmountSelector)
        .invoke('text')
        .then((before) => {
          step5Amount = parseFloat(before.replace(/[^0-9]/g, ''));
          cy.get(actionAmountSelector).clear();
          cy.get(actionAmountSelector).type(paramChangeStep.toString());
          cy.get(actionTriggerSelector).click();
          cy.wait(txWaitMilliSec);
          cy.get(currentAmountSelector)
            .invoke('text')
            .then((after) => {
              step6Amount = parseFloat(after.replace(/[^0-9]/g, ''));
              expect(step6Amount).eq(step5Amount - paramChangeStep * 0.99);
            });
        });
    });

    after(() => {
      // deposit
      const currentAmountSelector =
        '[data-testid=collateral-data-currentAmount]';
      const actionAmountSelector =
        '[data-testid=collateral-data-withdrawalAmount]';
      const actionTriggerSelector = '[data-testid=collateral-act-withdraw]';
      const paramChangeStep = 1;

      cy.visit('/');
      cy.wait(visitWaitMillisec);
      cy.get(currentAmountSelector)
        .invoke('text')
        .then((before) => {
          step7Amount = parseFloat(before.replace(/[^0-9]/g, ''));
          cy.get(actionAmountSelector).clear();
          cy.get(actionAmountSelector).type(paramChangeStep.toString());
          cy.get(actionTriggerSelector).click();
          cy.wait(txWaitMilliSec);
          cy.get(currentAmountSelector)
            .invoke('text')
            .then((after) => {
              step8Amount = parseFloat(after.replace(/[^0-9]/g, ''));
              expect(step8Amount).eq(step7Amount - paramChangeStep);
            });
        });
    });
  }
);
