import {
  FormControl,
  FormErrorMessage,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import { useState } from 'react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import useInterval from '../../../hooks/useInterval';
import { useWithdrawCollateral } from '../../../state/pledge/hooks';
import { subtractToNum } from '../../../utils/bignumber';
import {
  formatCollateralizationRatio,
  formatPrice,
} from '../../../utils/prices';
import { CustomButton, CustomFormLabel, CustomInput } from '../../CommonItem';

type Props = {
  collateral: number;
  debt: number;
  rateOfEthJpy: number;
  withdrawalLockDate: number;
};

export default function WithdrawalInput(props: Props) {
  const { collateral, debt, rateOfEthJpy, withdrawalLockDate } = props;

  const withdrawCollateral = useWithdrawCollateral();

  const [withdrawal, setWithdrawal] = useState(0);
  const [remainLockTime, setRemainLockTime] = useState(-1);

  useInterval(() => {
    if (!withdrawalLockDate || !remainLockTime) {
      return;
    }
    const now = Math.floor(Date.now() / 1000);
    setRemainLockTime(withdrawalLockDate - now);
  }, 500);

  function validateWithdrawal(value: number) {
    // FIXME: ロックタイム中
    if (value == null || typeof value !== 'number') {
      return '数値で入力してください。';
    }
    if (value > collateral) {
      return '残高を超えています。';
    }

    // Value is correct
    setWithdrawal(value);
    return undefined;
  }

  function submitWithdrawal(
    values: { withdrawal: number },
    formikHelpers: FormikHelpers<{
      withdrawal: number;
    }>
  ) {
    console.log('submit withdrawal', values);
    withdrawCollateral(values.withdrawal);

    // reset
    setWithdrawal(0);
    formikHelpers.resetForm();
  }

  return (
    <Formik initialValues={{ withdrawal: 0 }} onSubmit={submitWithdrawal}>
      {(formikProps) => (
        <Form>
          <VStack spacing={4} align="start">
            <HStack spacing={4} align={formikProps.dirty ? 'center' : 'end'}>
              <Field name="withdrawal" validate={validateWithdrawal}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.withdrawal && !!form.touched.withdrawal
                    }
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
                      {form.errors.withdrawal}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <CustomButton
                isLoading={formikProps.isSubmitting}
                type="submit"
                data-testid="collateral-act-withdraw"
                disabled={remainLockTime > 0}
              >
                引出実行
              </CustomButton>
            </HStack>
            {withdrawal > 0 && (
              <HStack spacing={4} align="flex-end">
                <CustomFormLabel
                  text={`変動予測値表示...${
                    formatPrice(subtractToNum(collateral, withdrawal), 'jpy')
                      .value
                  }${
                    YAMATO_SYMBOL.COLLATERAL
                  }, 担保率${formatCollateralizationRatio(
                    (collateral - withdrawal) * rateOfEthJpy,
                    debt
                  )}%`}
                />
              </HStack>
            )}
            {remainLockTime > 0 && (
              <HStack spacing={4} align="flex-end">
                <CustomFormLabel
                  text={`ロックタイムカウントダウン...${format(
                    remainLockTime * 1000,
                    'あとdd日HH時mm分ss秒'
                  )}`}
                />
              </HStack>
            )}
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
