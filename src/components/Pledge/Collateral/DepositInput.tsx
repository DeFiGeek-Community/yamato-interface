import {
  FormControl,
  FormErrorMessage,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MIN_COLLATERAL, YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useDepositCallback } from '../../../hooks/yamato/useDepositCallback';
import { useWalletState } from '../../../state/wallet/hooks';
import { addToNum } from '../../../utils/bignumber';
import { errorToast } from '../../../utils/errorToast';
import {
  formatCollateralizationRatio,
  formatPrice,
} from '../../../utils/prices';
import { CustomButton, CustomFormLabel, CustomInput } from '../../CommonItem';

type Props = { collateral: number; debt: number; rateOfEthJpy: number };

export default function DepositInput(props: Props) {
  const { collateral, debt, rateOfEthJpy } = props;

  const { account } = useActiveWeb3React();
  const { callback } = useDepositCallback();
  const { eth } = useWalletState();

  const [deposit, setDeposit] = useState<number | ''>();

  const { t } = useTranslation();

  const validateDeposit = useCallback(
    async (value: number | '') => {
      if (!account || !callback) {
        return t('pledge.collateral.alert1');
      }

      if (!value) {
        setDeposit(value);
        return;
      }
      if (value > eth) {
        return t('pledge.collateral.alert2');
      }
      if (value < MIN_COLLATERAL - collateral) {
        return (
          t('pledge.collateral.alert3') +
          MIN_COLLATERAL +
          YAMATO_SYMBOL.COLLATERAL +
          t('pledge.collateral.alert4')
        );
      }

      // Value is correct
      setDeposit(value);
      return undefined;
    },
    [account, eth, collateral, t, callback]
  );

  const submitDeposit = useCallback(
    async (
      values: { deposit: number | '' },
      formikHelpers: FormikHelpers<{
        deposit: number | '';
      }>
    ) => {
      console.debug('submit deposit', values);

      if (!values.deposit) {
        return;
      }

      if (values.deposit <= 0) {
        errorToast(t('pledge.collateral.alert5'));
        return;
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const res = await callback!(values.deposit);
        console.debug('deposit done', res);
      } catch (error) {
        errorToast(error);
      }

      // reset
      setDeposit('');
      formikHelpers.resetForm();
    },
    [t, callback]
  );

  return (
    <Formik
      initialValues={{ deposit: '' as number | '' }}
      onSubmit={submitDeposit}
    >
      {(formikProps) => (
        <Form>
          <VStack spacing={4} align="start">
            <HStack
              spacing={4}
              align={
                formikProps.errors.deposit && formikProps.touched.deposit
                  ? 'center'
                  : 'end'
              }
            >
              <Field name="deposit" validate={validateDeposit}>
                {({ field }: FieldProps) => (
                  <FormControl
                    isInvalid={!!formikProps.errors.deposit}
                    style={{ maxWidth: '200px' }}
                  >
                    <CustomFormLabel
                      htmlFor="deposit"
                      text={t('pledge.collateral.depositAmountInput')}
                    />
                    <CustomInput
                      {...field}
                      id="deposit"
                      type="number"
                      placeholder={YAMATO_SYMBOL.COLLATERAL}
                      data-testid="collateral-data-depositAmount"
                    />
                    <FormErrorMessage>
                      {formikProps.errors.deposit}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <CustomButton
                isLoading={formikProps.isSubmitting}
                type="submit"
                data-testid="collateral-act-deposit"
                isDisabled={!deposit}
              >
                {t('pledge.collateral.depositExecution')}
              </CustomButton>
            </HStack>
            {deposit && deposit > 0 && (
              <VStack spacing={4} align="start">
                <CustomFormLabel
                  text={`${t('pledge.collateral.predictedFluctuation')} ${
                    formatPrice(addToNum(collateral, deposit), 'jpy').value
                  } ${YAMATO_SYMBOL.COLLATERAL}`}
                />
                <CustomFormLabel
                  text={`${t(
                    'pledge.collateral.collateralRate'
                  )} ${formatCollateralizationRatio(
                    (collateral + deposit) * rateOfEthJpy,
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
