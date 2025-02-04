import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../../../context/CurrencyContext';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useRepayCallback } from '../../../hooks/yamato/useRepayCallback';
import { subtractToNum } from '../../../utils/bignumber';
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
  cjpy: number;
};

export default function RepayInput(props: Props) {
  const { collateral, debt, rateOfEthJpy, cjpy } = props;
  const { currency } = useCurrency();

  const { account } = useActiveWeb3React();
  const { callback } = useRepayCallback();

  const [repayment, setRepayment] = useState<number | ''>();

  const { t } = useTranslation();

  const validateRepayment = useCallback(
    (value: number | '') => {
      if (!account || !callback) {
        return t('pledge.debt.alert1');
      }

      if (!value) {
        setRepayment(value);
        return;
      }
      if (value > debt) {
        return t('pledge.debt.alert5');
      }
      if (value > cjpy) {
        return t('pledge.debt.alert6');
      }

      // Value is correct
      setRepayment(value);
      return undefined;
    },
    [account, debt, cjpy, t, callback]
  );

  const submitRepayment = useCallback(
    async (
      values: { repayment: number | '' },
      formikHelpers: FormikHelpers<{
        repayment: number | '';
      }>
    ) => {
      console.debug('submit repayment', values);

      if (!values.repayment) {
        return;
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const res = await callback!(values.repayment);
        console.debug('repayment done', res);
      } catch (error) {
        errorToast(error);
      }

      // reset
      setRepayment('');
      formikHelpers.resetForm();
    },
    [callback]
  );
  return (
    <Formik
      initialValues={{ repayment: '' as number | '' }}
      onSubmit={submitRepayment}
    >
      {(formikProps) => (
        <Form>
          <VStack spacing={4} align="start" width="100%">
            <Field name="repayment" validate={validateRepayment}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!formikProps.errors.repayment}
                  width="100%"
                >
                  <CustomFormLabel
                    htmlFor="repayment"
                    text={t('pledge.debt.repaymentAmountInput')}
                  />
                  <HStack width="100%" spacing={2}>
                    <CustomInput
                      {...field}
                      id="repayment"
                      type="number"
                      placeholder={currency}
                      data-testid="borrowing-data-repayAmount"
                    />
                    {debt > 0 && cjpy > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const value = Math.min(debt, cjpy);
                          form.setFieldValue('repayment', value);
                        }}
                        minWidth="40px"
                      >
                        MAX
                      </Button>
                    )}
                    <CustomButton
                      isLoading={formikProps.isSubmitting}
                      type="submit"
                      data-testid="borrowing-act-repay"
                      isDisabled={!repayment}
                      minWidth="80px"
                    >
                      {t('pledge.debt.repaymentExecution')}
                    </CustomButton>
                  </HStack>
                  <FormErrorMessage>
                    {formikProps.errors.repayment}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            {repayment && repayment > 0 && (
              <VStack spacing={4} align="start" width="100%">
                <CustomFormLabel
                  text={`${t('pledge.debt.predictedFluctuation')} ${
                    formatPrice(subtractToNum(debt, repayment), 'jpy').value
                  } ${currency}`}
                />
                <CustomFormLabel
                  text={`${t(
                    'pledge.debt.collateralRate'
                  )} ${formatCollateralizationRatio(
                    collateral * rateOfEthJpy,
                    debt - repayment
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
