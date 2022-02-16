import {
  FormControl,
  FormErrorMessage,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import { useCallback, useState } from 'react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
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

  const [withdrawal, setWithdrawal] = useState(0);

  const validateWithdrawal = useCallback(
    (value: number) => {
      if (!account || !callback) {
        return `ウォレットを接続してください。またはネットワークを切り替えてください。`;
      }

      if (value == null || typeof value !== 'number') {
        return '数値で入力してください。';
      }
      if (value > collateral) {
        return '担保量を超えています。';
      }

      // Value is correct
      setWithdrawal(value);
      return undefined;
    },
    [account, collateral, callback]
  );

  const submitWithdrawal = useCallback(
    async (
      values: { withdrawal: number },
      formikHelpers: FormikHelpers<{
        withdrawal: number;
      }>
    ) => {
      console.debug('submit withdrawal', values);

      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const res = await callback!(values.withdrawal);
        console.debug('withdrawal done', res);
      } catch (error) {
        errorToast(error);
      }

      // reset
      setWithdrawal(0);
      formikHelpers.resetForm();
    },
    [callback]
  );

  return (
    <Formik initialValues={{ withdrawal: 0 }} onSubmit={submitWithdrawal}>
      {(formikProps) => (
        <Form>
          <VStack spacing={4} align="start">
            <HStack
              spacing={4}
              align={
                formikProps.errors.withdrawal && formikProps.touched.withdrawal
                  ? 'center'
                  : 'end'
              }
            >
              <Field name="withdrawal" validate={validateWithdrawal}>
                {({ field }: FieldProps) => (
                  <FormControl
                    isInvalid={!!formikProps.errors.withdrawal}
                    style={{ maxWidth: '200px' }}
                  >
                    <CustomFormLabel htmlFor="withdrawal" text="引出量入力" />
                    <CustomInput
                      {...field}
                      id="withdrawal"
                      type="number"
                      placeholder={YAMATO_SYMBOL.COLLATERAL}
                      data-testid="collateral-data-withdrawalAmount"
                    />
                    <FormErrorMessage>
                      {formikProps.errors.withdrawal}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <CustomButton
                isLoading={formikProps.isSubmitting}
                type="submit"
                data-testid="collateral-act-withdraw"
              >
                引出実行
              </CustomButton>
            </HStack>
            {withdrawal > 0 && (
              <VStack spacing={4} align="start">
                <CustomFormLabel
                  text={`変動予測値表示 ${
                    formatPrice(subtractToNum(collateral, withdrawal), 'jpy')
                      .value
                  }${YAMATO_SYMBOL.COLLATERAL}`}
                />
                <CustomFormLabel
                  text={`担保率 ${formatCollateralizationRatio(
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
