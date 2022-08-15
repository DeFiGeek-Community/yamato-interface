import {
  FormControl,
  FormErrorMessage,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useBorrowCallback } from '../../../hooks/yamato/useBorrowCallback';
import { addToNum, divideToNum } from '../../../utils/bignumber';
import { calcFee } from '../../../utils/calcFee';
import { errorToast } from '../../../utils/errorToast';
import {
  formatCollateralizationRatio,
  formatPrice,
} from '../../../utils/prices';
import { CustomButton, CustomFormLabel, CustomInput } from '../../CommonItem';

type Props = {
  collateral: number;
  debt: number;
  rateOfEthJpy: number;
  MCR: number;
};

export default function BorrowingInput(props: Props) {
  const { collateral, debt, rateOfEthJpy, MCR } = props;

  const { account } = useActiveWeb3React();
  const { callback } = useBorrowCallback();

  const { t } = useTranslation();

  const [borrowing, setBorrowing] = useState<number | ''>();

  const feeResult = useMemo(() => {
    if (borrowing) {
      if (debt + borrowing <= 0) {
        return { fee: 0, feeRate: 0 };
      }
      const ICR =
        divideToNum(collateral * rateOfEthJpy, debt + borrowing) * 100;
      return calcFee(borrowing, ICR);
    } else {
      return { fee: 0, feeRate: 0 };
    }
  }, [collateral, debt, borrowing, rateOfEthJpy]);

  const validateBorrowing = useCallback(
    async (value: number | '') => {
      if (!account || !callback) {
        return t('pledge.debt.alert1');
      }

      if (!value) {
        setBorrowing(value);
        return;
      }

      const sum = debt + value;
      if (sum <= 0) {
        return t('pledge.debt.alert2');
      }
      const collateralRate = ((collateral * rateOfEthJpy) / sum) * 100;
      if (MCR > collateralRate) {
        return `${t('pledge.debt.alert3')} ${MCR} ${t('pledge.debt.alert4')}`;
      }

      // Value is correct
      setBorrowing(value);
      return undefined;
    },
    [account, collateral, debt, rateOfEthJpy, MCR, t, callback]
  );

  const submitBorrowing = useCallback(
    async (
      values: { borrowing: number | '' },
      formikHelpers: FormikHelpers<{
        borrowing: number | '';
      }>
    ) => {
      console.debug('submit borrowing', values);

      if (!values.borrowing) {
        return;
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const res = await callback!(values.borrowing);
        console.debug('borrowing done', res);
      } catch (error) {
        errorToast(error);
      }

      // reset
      setBorrowing('');
      formikHelpers.resetForm();
    },
    [callback]
  );

  return (
    <Formik
      initialValues={{ borrowing: '' as number | '' }}
      onSubmit={submitBorrowing}
    >
      {(formikProps) => (
        <Form>
          <VStack spacing={4} align="start">
            <HStack
              spacing={4}
              align={
                formikProps.errors.borrowing && formikProps.touched.borrowing
                  ? 'center'
                  : 'end'
              }
            >
              <Field name="borrowing" validate={validateBorrowing}>
                {({ field }: FieldProps) => (
                  <FormControl
                    isInvalid={!!formikProps.errors.borrowing}
                    style={{ maxWidth: '200px' }}
                  >
                    <CustomFormLabel
                      htmlFor="borrowing"
                      text={t('pledge.debt.borrowAmountInput')}
                    />
                    <CustomInput
                      {...field}
                      id="borrowing"
                      type="number"
                      placeholder={YAMATO_SYMBOL.YEN}
                      data-testid="borrowing-data-borrowAmount"
                    />
                    <FormErrorMessage>
                      {formikProps.errors.borrowing}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <CustomButton
                isLoading={formikProps.isSubmitting}
                type="submit"
                data-testid="borrowing-act-borrow"
                isDisabled={!borrowing}
              >
                {t('pledge.debt.borrowExecution')}
              </CustomButton>
            </HStack>
            {borrowing && borrowing > 0 && (
              <VStack spacing={4} align="start">
                <CustomFormLabel
                  text={`${t('pledge.debt.receiptAmount')} ${
                    formatPrice(borrowing - feeResult.fee, 'jpy').value
                  } ${YAMATO_SYMBOL.YEN}`}
                />
                <CustomFormLabel
                  text={`${t('pledge.debt.fee')} ${
                    formatPrice(feeResult.fee, 'jpy').value
                  } ${YAMATO_SYMBOL.YEN}(${t(
                    'pledge.debt.feeRate'
                  )} ${feeResult.feeRate.toFixed(2)}%)`}
                />
                <CustomFormLabel
                  text={`${t('pledge.debt.totalBorrowAmount')} ${
                    formatPrice(addToNum(debt, borrowing), 'jpy').value
                  } ${YAMATO_SYMBOL.YEN}`}
                />
                <CustomFormLabel
                  text={`${t(
                    'pledge.debt.collateralRate'
                  )} ${formatCollateralizationRatio(
                    collateral * rateOfEthJpy,
                    debt + borrowing
                  )}%`}
                />
              </VStack>
            )}
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
