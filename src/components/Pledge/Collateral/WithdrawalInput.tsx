import {
  FormControl,
  FormErrorMessage,
  HStack,
  VStack,
  Button,
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MIN_COLLATERAL, YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useWithdrawCallback } from '../../../hooks/yamato/useWithdrawCallback';
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
};

export default function WithdrawalInput(props: Props) {
  const { collateral, debt, rateOfEthJpy } = props;

  const { account } = useActiveWeb3React();
  const { callback } = useWithdrawCallback();

  const [withdrawal, setWithdrawal] = useState<number | ''>();
  const { t } = useTranslation();
  const validateWithdrawal = useCallback(
    (value: number | '') => {
      if (!account || !callback) {
        return t('pledge.collateral.alert1');
      }

      if (!value) {
        setWithdrawal(value);
        return;
      }
      if (value > collateral) {
        return t('pledge.collateral.alert6');
      }
      if (value > collateral - MIN_COLLATERAL && value !== collateral) {
        return (
          t('pledge.collateral.alert3') +
          MIN_COLLATERAL +
          YAMATO_SYMBOL.COLLATERAL +
          t('pledge.collateral.alert4')
        );
      }
      // Value is correct
      setWithdrawal(value);
      return undefined;
    },
    [account, collateral, t, callback]
  );

  const submitWithdrawal = useCallback(
    async (
      values: { withdrawal: number | '' },
      formikHelpers: FormikHelpers<{
        withdrawal: number | '';
      }>
    ) => {
      console.debug('submit withdrawal', values);

      if (!values.withdrawal) {
        return;
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const res = await callback!(values.withdrawal);
        console.debug('withdrawal done', res);
      } catch (error) {
        errorToast(error);
      }

      // reset
      setWithdrawal('');
      formikHelpers.resetForm();
    },
    [callback]
  );

  return (
    <Formik
      initialValues={{ withdrawal: '' as number | '' }}
      onSubmit={submitWithdrawal}
    >
      {(formikProps) => (
        <Form>
          <VStack spacing={4} align="start" width="100%">
            <Field name="withdrawal" validate={validateWithdrawal}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!formikProps.errors.withdrawal}
                  width="100%"
                >
                  <CustomFormLabel
                    htmlFor="withdrawal"
                    text={t('pledge.collateral.withdrawalAmountInput')}
                  />
                  <HStack width="100%" spacing={2}>
                    <CustomInput
                      {...field}
                      id="withdrawal"
                      type="number"
                      placeholder={YAMATO_SYMBOL.COLLATERAL}
                      data-testid="collateral-data-withdrawalAmount"
                    />

                    {collateral > 0 && debt == 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          form.setFieldValue('withdrawal', collateral);
                        }}
                        minWidth="40px"
                      >
                        MAX
                      </Button>
                    )}
                    <CustomButton
                      isLoading={formikProps.isSubmitting}
                      type="submit"
                      data-testid="collateral-act-withdraw"
                      isDisabled={!withdrawal}
                      minWidth="80px"
                    >
                      {t('pledge.collateral.withdrawalExecution')}
                    </CustomButton>
                  </HStack>
                  <FormErrorMessage>
                    {formikProps.errors.withdrawal}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            {withdrawal && withdrawal > 0 && (
              <VStack spacing={2} align="start">
                <CustomFormLabel
                  text={`${t('pledge.collateral.predictedFluctuation')} ${
                    formatPrice(subtractToNum(collateral, withdrawal), 'jpy')
                      .value
                  } ${YAMATO_SYMBOL.COLLATERAL}`}
                />
                <CustomFormLabel
                  text={`${t(
                    'pledge.collateral.collateralRate'
                  )} ${formatCollateralizationRatio(
                    (collateral - withdrawal) * rateOfEthJpy,
                    debt
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
