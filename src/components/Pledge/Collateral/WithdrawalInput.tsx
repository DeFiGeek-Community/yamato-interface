import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import { useState } from 'react';
import useInterval from '../../../hooks/useInterval';
import { useWithdrawCollateral } from '../../../state/pledge/hooks';
import { subtractToNum } from '../../../utils/bignumber';

type Props = { collateral: number; withdrawalLockDate: number };

export default function WithdrawalInput(props: Props) {
  const withdrawCollateral = useWithdrawCollateral();

  const [withdrawal, setWithdrawal] = useState(0);
  const [remainLockTime, setRemainLockTime] = useState(-1);

  useInterval(() => {
    if (!props.withdrawalLockDate || !remainLockTime) {
      return;
    }
    const now = Math.floor(Date.now() / 1000);
    setRemainLockTime(props.withdrawalLockDate - now);
  }, 500);

  function validateWithdrawal(value: number) {
    let error;
    if (value == null || typeof value !== 'number') {
      error = 'withdrawal must be number';
    } else if (value > props.collateral) {
      error = '残高を超えています';
    }
    if (!error) {
      setWithdrawal(value);
    }
    return error;
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
          <Stack spacing={4} direction="row" align="flex-end">
            <Field name="withdrawal" validate={validateWithdrawal}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    !!form.errors.withdrawal && !!form.touched.withdrawal
                  }
                  style={{ maxWidth: '200px' }}
                >
                  <FormLabel htmlFor="withdrawal">引出量入力</FormLabel>
                  <Input
                    {...field}
                    id="withdrawal"
                    type="number"
                    placeholder="ETH"
                  />
                  <FormErrorMessage>{form.errors.withdrawal}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              colorScheme="teal"
              isLoading={formikProps.isSubmitting}
              type="submit"
            >
              引出実行
            </Button>
          </Stack>
          {withdrawal > 0 && (
            <div style={{ marginTop: '8px' }}>
              <label>変動予測値表示</label>
              <span>{subtractToNum(props.collateral, withdrawal)}</span>
            </div>
          )}
          {remainLockTime > 0 && (
            <div style={{ marginTop: '8px' }}>
              <label>ロックタイムカウントダウン </label>
              <span>
                {format(remainLockTime * 1000, 'あとdd日HH時mm分ss秒')}
              </span>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}
