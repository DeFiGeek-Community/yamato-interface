import {
  FormControl,
  FormErrorMessage,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { intervalToDuration } from 'date-fns';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import { useState } from 'react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import useInterval from '../../../hooks/useInterval';
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
  withdrawalLockDate: number;
};

export default function WithdrawalInput(props: Props) {
  const { collateral, debt, rateOfEthJpy, withdrawalLockDate } = props;

  const { account } = useActiveWeb3React();
  const { callback } = useWithdrawCallback();

  const [withdrawal, setWithdrawal] = useState(0);
  const [isRemainLockTime, setIsRemainLockTime] = useState(false);
  const [remainLockTime, setRemainLockTime] = useState('');

  useInterval(() => {
    if (!withdrawalLockDate) {
      return;
    }

    const now = Date.now();
    const lockDate = withdrawalLockDate * 1000;
    const remain = intervalToDuration({
      start: now,
      end: lockDate,
    });
    const hours = (remain.days ?? 0) * 24 + (remain.hours ?? 0);

    setIsRemainLockTime(lockDate - now > 0);
    setRemainLockTime(
      `あと${hours}時間${remain.minutes ?? 0}分${remain.seconds ?? 0}秒`
    );
  }, 500);

  function validateWithdrawal(value: number) {
    if (!account || !callback) {
      return `ウォレットを接続してください。またはネットワークを切り替えてください。`;
    }

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

  async function submitWithdrawal(
    values: { withdrawal: number },
    formikHelpers: FormikHelpers<{
      withdrawal: number;
    }>
  ) {
    console.debug('submit withdrawal', values);

    try {
      const res = await callback!(values.withdrawal);
      console.debug('withdrawal done', res);
    } catch (error) {
      errorToast(error);
    }

    // reset
    setWithdrawal(0);
    formikHelpers.resetForm();
  }

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
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!formikProps.errors.withdrawal &&
                      !!form.touched.withdrawal
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
                      {formikProps.errors.withdrawal}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <CustomButton
                isLoading={formikProps.isSubmitting}
                type="submit"
                data-testid="collateral-act-withdraw"
                disabled={isRemainLockTime}
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
            {isRemainLockTime && (
              <HStack spacing={4} align="flex-end">
                <CustomFormLabel
                  text={`ロックタイムカウントダウン...${remainLockTime}`}
                />
              </HStack>
            )}
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
