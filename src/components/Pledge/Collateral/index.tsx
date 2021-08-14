import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Stack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { useState } from 'react';
import { useActiveWeb3React } from '../../../hooks/web3';
import {
  useDepositCollateral,
  usePledgeData,
  useWithdrawCollateral,
} from '../../../state/pledge/hooks';
import { formatEther } from '../../../utils/web3';
import { Label, CurrentValue } from '../common';

export default function Collateral() {
  const { account, library } = useActiveWeb3React();
  const pledge = usePledgeData();
  const depositCollateral = useDepositCollateral();
  const withdrawCollateral = useWithdrawCollateral();

  const [collateral, setCollateral] = useState(0);
  const [withdrawal, setWithdrawal] = useState(0);

  async function validateCollateral(value: number) {
    let error;
    const balance =
      library && account
        ? Number(formatEther(await library.getBalance(account)))
        : 0;
    if (value == null || typeof value !== 'number') {
      error = 'collateral must be number';
    } else if (value > balance) {
      error = '残高を超えています';
    }
    if (!error) {
      setCollateral(value);
    }
    return error;
  }
  function validateWithdrawal(value: number) {
    let error;
    if (value == null || typeof value !== 'number') {
      error = 'withdrawal must be number';
    } else if (value > pledge.collateral) {
      error = '残高を超えています';
    }
    if (!error) {
      setWithdrawal(value);
    }
    return error;
  }

  function submitCollateral(
    values: { collateral: number },
    formikHelpers: FormikHelpers<{
      collateral: number;
    }>
  ) {
    console.log('submit collateral', values);
    depositCollateral(values.collateral);
    formikHelpers.resetForm();
  }
  function submitWithdrawal(
    values: { withdrawal: number },
    formikHelpers: FormikHelpers<{
      withdrawal: number;
    }>
  ) {
    console.log('submit withdrawal', values);
    withdrawCollateral(values.withdrawal);
    formikHelpers.resetForm();
  }

  return (
    <HStack spacing="24px">
      <Label>担保数</Label>
      <CurrentValue>{pledge.collateral}</CurrentValue>

      <Formik initialValues={{ collateral: 0 }} onSubmit={submitCollateral}>
        {(props) => (
          <Form>
            <Stack spacing={4} direction="row" align="flex-end">
              <Field name="collateral" validate={validateCollateral}>
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isInvalid={
                      form.errors.collateral && form.touched.collateral
                    }
                  >
                    <FormLabel htmlFor="collateral">預入量入力</FormLabel>
                    <Input
                      {...field}
                      id="collateral"
                      type="number"
                      placeholder="ETH"
                    />
                    <FormErrorMessage>
                      {form.errors.collateral}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                預入実行
              </Button>
            </Stack>
            <Stack spacing={4} direction="row" align="flex-end">
              <label>変動予測値表示</label>
              <div>{pledge.collateral + collateral}</div>
            </Stack>
          </Form>
        )}
      </Formik>

      <Formik initialValues={{ withdrawal: 0 }} onSubmit={submitWithdrawal}>
        {(props) => (
          <Form>
            <Stack spacing={4} direction="row" align="flex-end">
              <Field name="withdrawal" validate={validateWithdrawal}>
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isInvalid={
                      form.errors.withdrawal && form.touched.withdrawal
                    }
                  >
                    <FormLabel htmlFor="withdrawal">引出量入力</FormLabel>
                    <Input
                      {...field}
                      id="withdrawal"
                      type="number"
                      placeholder="ETH"
                    />
                    <FormErrorMessage>
                      {form.errors.withdrawal}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                引出実行
              </Button>
            </Stack>
            <Stack spacing={4} direction="row" align="flex-end">
              <label>変動予測値表示</label>
              <div>{pledge.collateral - withdrawal}</div>
            </Stack>
          </Form>
        )}
      </Formik>
    </HStack>
  );
}
