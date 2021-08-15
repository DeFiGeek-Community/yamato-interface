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
import { useRepayDebt } from '../../../state/pledge/hooks';
import { subtractToNum } from '../../../utils/bignumber';
import { formatCollateralizationRatio } from '../../../utils/prices';

type Props = { collateral: number; debt: number };

export default function RepayInput(props: Props) {
  const repayDebt = useRepayDebt();

  const [repayment, setRepayment] = useState(0);

  function validateRepayment(value: number) {
    if (value == null || typeof value !== 'number') {
      return '数値で入力してください。';
    }
    if (value > props.debt) {
      return '残高を超えています。';
    }

    // Value is correct
    setRepayment(value);
    return undefined;
  }

  function submitRepayment(
    values: { repayment: number },
    formikHelpers: FormikHelpers<{
      repayment: number;
    }>
  ) {
    console.log('submit repayment', values);
    repayDebt(values.repayment);

    // reset
    setRepayment(0);
    formikHelpers.resetForm();
  }

  return (
    <Formik initialValues={{ repayment: 0 }} onSubmit={submitRepayment}>
      {(formikProps) => (
        <Form>
          <VStack spacing={4} align="start">
            <HStack spacing={4} align="flex-end">
              <Field name="repayment" validate={validateRepayment}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.repayment && !!form.touched.repayment
                    }
                    style={{ maxWidth: '200px' }}
                  >
                    <FormLabel htmlFor="repayment">引出量入力</FormLabel>
                    <Input
                      {...field}
                      id="repayment"
                      type="number"
                      placeholder={YAMATO_SYMBOL.YEN}
                    />
                    <FormErrorMessage>{form.errors.repayment}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                colorScheme="teal"
                isLoading={formikProps.isSubmitting}
                type="submit"
              >
                返済実行
              </Button>
            </HStack>
            {repayment > 0 && (
              <HStack spacing={4} align="flex-end">
                <label>変動予測値表示</label>
                <span>
                  {subtractToNum(props.debt, repayment)}
                  {YAMATO_SYMBOL.YEN}
                  {', 担保率'}
                  {formatCollateralizationRatio(
                    props.collateral,
                    props.debt - repayment
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
