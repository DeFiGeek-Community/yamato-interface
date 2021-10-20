/// <reference types="cypress" />

const paramEthDelta = 1;
const paramCjpyDelta = 1000;
const feeRatio = 0.001;
const visitWaitMillisec = 10000;
const txWaitMilliSec = 50000;

describe(
  'Basic operations on borrowing',
  {
    viewportHeight: 936,
    viewportWidth: 1024,
  },
  () => {
    const currentCollateralAmountSelector =
      '[data-testid=collateral-data-currentAmount]';
    const currentBorrowingAmountSelector =
      '[data-testid=borrowing-data-currentAmount]';
    let step1Amount;
    let step2Amount;
    let step3Amount;
    let step4Amount;
    let step5Amount;
    let step6Amount;
    let step7Amount;
    let step8Amount;

    beforeEach(() => {
      cy.visit('/');
    });

    it('deposit collateral', () => {
      const actionAmountSelector =
        '[data-testid=collateral-data-depositAmount]';
      const actionTriggerSelector = '[data-testid=collateral-act-deposit]';

      cy.visit('/');
      cy.wait(visitWaitMillisec);
      cy.get(currentCollateralAmountSelector)
        .invoke('text')
        .then((before) => {
          step1Amount = parseFloat(before.replace(/[^0-9]/g, ''));
          cy.get(actionAmountSelector).clear();
          cy.get(actionAmountSelector).type(paramEthDelta.toString());
          cy.get(actionTriggerSelector).click();
          cy.wait(txWaitMilliSec);
          cy.get(currentCollateralAmountSelector)
            .invoke('text')
            .then((after) => {
              step2Amount = parseFloat(after.replace(/[^0-9]/g, ''));
              expect(step2Amount).eq(step1Amount + paramEthDelta);
            });
        });
    });

    it('borrow CJPY', () => {
      const actionAmountSelector = '[data-testid=borrowing-data-borrowAmount]';
      const actionTriggerSelector = '[data-testid=borrowing-act-borrow]';
      const paramCjpyDelta = paramCjpyDelta;

      cy.wait(visitWaitMillisec);
      cy.get(currentBorrowingAmountSelector)
        .invoke('text')
        .then((before) => {
          step3Amount = parseFloat(before.replace(/[^0-9]/g, ''));
          cy.get(actionAmountSelector).clear();
          cy.get(actionAmountSelector).type(paramCjpyDelta.toString());
          cy.get(actionTriggerSelector).click();
          cy.wait(txWaitMilliSec);
          cy.get(currentBorrowingAmountSelector)
            .invoke('text')
            .then((after) => {
              step4Amount = parseFloat(after.replace(/[^0-9]/g, ''));
              expect(step4Amount).eq(step3Amount + paramCjpyDelta);
            });
        });
    });

    it('repayment CJPY', () => {
      const actionAmountSelector = '[data-testid=borrowing-data-repayAmount]';
      const actionTriggerSelector = '[data-testid=borrowing-act-repay]';
      const repayCjpyDelta = paramCjpyDelta * (1 - feeRatio);

      cy.wait(visitWaitMillisec);
      cy.get(currentBorrowingAmountSelector)
        .invoke('text')
        .then((before) => {
          step5Amount = parseFloat(before.replace(/[^0-9]/g, ''));
          cy.get(actionAmountSelector).clear();
          cy.get(actionAmountSelector).type(repayCjpyDelta.toString());
          cy.get(actionTriggerSelector).click();
          cy.wait(txWaitMilliSec);
          cy.get(currentBorrowingAmountSelector)
            .invoke('text')
            .then((after) => {
              step6Amount = parseFloat(after.replace(/[^0-9]/g, ''));
              expect(step6Amount).eq(step5Amount - repayCjpyDelta);
            });
        });
    });

    it('withdraw collateral', () => {
      const actionAmountSelector =
        '[data-testid=collateral-data-withdrawalAmount]';
      const actionTriggerSelector = '[data-testid=collateral-act-withdraw]';

      cy.visit('/');
      cy.wait(visitWaitMillisec);

      cy.get(actionAmountSelector).click().should('be.disabled');

      cy.get(currentCollateralAmountSelector)
        .invoke('text')
        .then((before) => {
          step7Amount = parseFloat(before.replace(/[^0-9]/g, ''));
          cy.get(actionAmountSelector).clear();
          cy.get(actionAmountSelector).type(paramEthDelta.toString());
          cy.get(actionTriggerSelector).click();
          cy.wait(txWaitMilliSec);
          cy.get(currentCollateralAmountSelector)
            .invoke('text')
            .then((after) => {
              step8Amount = parseFloat(after.replace(/[^0-9]/g, ''));
              expect(step8Amount).eq(step7Amount - paramEthDelta);
            });
        });
    });
  }
);
