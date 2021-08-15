import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import { useState } from 'react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useDepositCollateral } from '../../../state/pledge/hooks';
import { addToNum } from '../../../utils/bignumber';
import { formatCollateralizationRatio } from '../../../utils/prices';
import { formatEther } from '../../../utils/web3';

type Props = { collateral: number; debt: number };

export default function DepositInput(props: Props) {
  const { account, library } = useActiveWeb3React();
  const depositCollateral = useDepositCollateral();

  const [deposit, setDeposit] = useState(0);

  async function validateDeposit(value: number) {
    if (value == null || typeof value !== 'number') {
      return '数値で入力してください。';
    }

    const balance =
      library && account
        ? Number(formatEther(await library.getBalance(account)))
        : 0;
    if (value > balance) {
      return '残高を超えています。';
    }

    // Value is correct
    setDeposit(value);
    return undefined;
  }

  function submitDeposit(
    values: { deposit: number },
    formikHelpers: FormikHelpers<{
      deposit: number;
    }>
  ) {
    console.log('submit deposit', values);
    depositCollateral(values.deposit);

    // reset
    setDeposit(0);
    formikHelpers.resetForm();
  }

  return (
    <Formik initialValues={{ deposit: 0 }} onSubmit={submitDeposit}>
      {(formikProps) => (
        <Form>
          <VStack spacing={4} align="start">
            <HStack spacing={4} align="flex-end">
              <Field name="deposit" validate={validateDeposit}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={!!form.errors.deposit && !!form.touched.deposit}
                    style={{ maxWidth: '200px' }}
                  >
                    <FormLabel htmlFor="deposit">預入量入力</FormLabel>
                    <Input
                      {...field}
                      id="deposit"
                      type="number"
                      placeholder={YAMATO_SYMBOL.COLLATERAL}
                    />
                    <FormErrorMessage>{form.errors.deposit}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                colorScheme="teal"
                isLoading={formikProps.isSubmitting}
                type="submit"
              >
                預入実行
              </Button>
            </HStack>
            {deposit > 0 && (
              <HStack spacing={4} align="flex-end">
                <label>変動予測値表示</label>
                <span>
                  {addToNum(props.collateral, deposit)}
                  {YAMATO_SYMBOL.COLLATERAL}
                  {', 担保率'}
                  {formatCollateralizationRatio(
                    props.collateral + deposit,
                    props.debt
                  )}
                  %
                </span>
              </HStack>
            )}
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
