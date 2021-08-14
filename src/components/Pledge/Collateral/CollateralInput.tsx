import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import { useState } from 'react';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useDepositCollateral } from '../../../state/pledge/hooks';
import { addToNum } from '../../../utils/bignumber';
import { formatEther } from '../../../utils/web3';

type Props = { collateral: number };

export default function CollateralInput(props: Props) {
  const { account, library } = useActiveWeb3React();
  const depositCollateral = useDepositCollateral();

  const [collateral, setCollateral] = useState(0);

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

  function submitCollateral(
    values: { collateral: number },
    formikHelpers: FormikHelpers<{
      collateral: number;
    }>
  ) {
    console.log('submit collateral', values);
    depositCollateral(values.collateral);

    // reset
    setCollateral(0);
    formikHelpers.resetForm();
  }

  return (
    <Formik initialValues={{ collateral: 0 }} onSubmit={submitCollateral}>
      {(formikProps) => (
        <Form>
          <Stack spacing={4} direction="row" align="flex-end">
            <Field name="collateral" validate={validateCollateral}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    !!form.errors.collateral && !!form.touched.collateral
                  }
                  style={{ maxWidth: '200px' }}
                >
                  <FormLabel htmlFor="collateral">預入量入力</FormLabel>
                  <Input
                    {...field}
                    id="collateral"
                    type="number"
                    placeholder="ETH"
                  />
                  <FormErrorMessage>{form.errors.collateral}</FormErrorMessage>
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
          </Stack>
          {collateral > 0 && (
            <div>
              <label>変動予測値表示</label>
              <span>{addToNum(props.collateral, collateral)}</span>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}
