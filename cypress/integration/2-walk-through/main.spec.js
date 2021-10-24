/// <reference types="cypress" />

import { connectWallet } from '../../support/commands';

const paramEthDelta = 0.0001;
const paramCjpyDelta = 0.1;
const feeRatio = 0.001;

connectWallet();

describe(
  'Walk through',
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
      const visitWaitMillisec = 10000;
      const txWaitMilliSec = 50000;

      cy.visit('/');
      cy.wait(visitWaitMillisec);
      cy.get(currentCollateralAmountSelector)
        .invoke('text')
        .then((before) => {
          step1Amount = parseFloat(before);
          cy.get(actionAmountSelector).clear();
          cy.get(actionAmountSelector).type(paramEthDelta.toString());
          cy.get(actionTriggerSelector).click();
          cy.wait(txWaitMilliSec);
          cy.get(currentCollateralAmountSelector)
            .invoke('text')
            .then((after) => {
              step2Amount = parseFloat(after);
              expect(step2Amount).eq(step1Amount + paramEthDelta);
            });
        });
    });

    it('borrow CJPY', () => {
      const actionAmountSelector = '[data-testid=borrowing-data-borrowAmount]';
      const actionTriggerSelector = '[data-testid=borrowing-act-borrow]';
      const visitWaitMillisec = 10000;
      const txWaitMilliSec = 30000;

      cy.wait(visitWaitMillisec);
      cy.get(currentBorrowingAmountSelector)
        .invoke('text')
        .then((before) => {
          step3Amount = parseFloat(before);
          cy.get(actionAmountSelector).clear();
          cy.get(actionAmountSelector).type(paramCjpyDelta.toString());
          cy.get(actionTriggerSelector).click();
          cy.wait(txWaitMilliSec);
          cy.get(currentBorrowingAmountSelector)
            .invoke('text')
            .then((after) => {
              step4Amount = parseFloat(after);
              expect(step4Amount).eq(step3Amount + paramCjpyDelta);
            });
        });
    });

    it('repayment CJPY', () => {
      const actionAmountSelector = '[data-testid=borrowing-data-repayAmount]';
      const actionTriggerSelector = '[data-testid=borrowing-act-repay]';
      const repayCjpyDelta = paramCjpyDelta * (1 - feeRatio);
      const visitWaitMillisec = 10000;
      const txWaitMilliSec = 30000;

      cy.wait(visitWaitMillisec);
      cy.get(currentBorrowingAmountSelector)
        .invoke('text')
        .then((before) => {
          step5Amount = parseFloat(before);
          cy.get(actionAmountSelector).clear();
          cy.get(actionAmountSelector).type(repayCjpyDelta.toString());
          cy.get(actionTriggerSelector).click();
          cy.wait(txWaitMilliSec);
          cy.get(currentBorrowingAmountSelector)
            .invoke('text')
            .then((after) => {
              step6Amount = parseFloat(after);
              expect(step6Amount).eq(step5Amount - repayCjpyDelta);
            });
        });
    });

    it('withdraw collateral', () => {
      const actionAmountSelector =
        '[data-testid=collateral-data-withdrawalAmount]';
      const actionTriggerSelector = '[data-testid=collateral-act-withdraw]';
      const stateLabelSelector =
        '[data-testid=collateral-data-withdrawalLabel]';
      const visitWaitMillisec = 10000;
      const txWaitMilliSec = 50000;

      cy.visit('/');
      cy.wait(visitWaitMillisec);

      if (cy.get(stateLabelSelector).contains('ロックタイムカウントダウン')) {
        cy.get(actionTriggerSelector).should('be.disabled');
      } else {
        // This code block is unreachable, but is left as a documentation.
        cy.get(currentCollateralAmountSelector)
          .invoke('text')
          .then((before) => {
            step7Amount = parseFloat(before);
            cy.get(actionAmountSelector).clear();
            cy.get(actionAmountSelector).type(paramEthDelta.toString());
            cy.get(actionTriggerSelector).click();
            cy.wait(txWaitMilliSec);
            cy.get(currentCollateralAmountSelector)
              .invoke('text')
              .then((after) => {
                step8Amount = parseFloat(after);
                expect(step8Amount).eq(step7Amount - paramEthDelta);
              });
          });
      }
    });
  }
);
