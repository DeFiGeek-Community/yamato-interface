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
import { MCR, YAMATO_SYMBOL } from '../../../constants/yamato';
import { useBorrowDebt } from '../../../state/pledge/hooks';
import { addToNum } from '../../../utils/bignumber';
import { formatCollateralizationRatio } from '../../../utils/prices';

type Props = { collateral: number; debt: number };

export default function BorrowingInput(props: Props) {
  const borrowDebt = useBorrowDebt();

  const [borrowing, setBorrowing] = useState(0);

  async function validateBorrowing(value: number) {
    if (value == null || typeof value !== 'number') {
      return '数値で入力してください。';
    }

    const sum = props.debt + value;
    const collateralRatio = (props.collateral / sum) * 100;
    if (MCR > collateralRatio) {
      return `担保率は最低${MCR}%が必要です。`;
    }

    // Value is correct
    setBorrowing(value);
    return undefined;
  }

  function submitBorrowing(
    values: { borrowing: number },
    formikHelpers: FormikHelpers<{
      borrowing: number;
    }>
  ) {
    console.log('submit borrowing', values);
    borrowDebt(values.borrowing);

    // reset
    setBorrowing(0);
    formikHelpers.resetForm();
  }

  return (
    <Formik initialValues={{ borrowing: 0 }} onSubmit={submitBorrowing}>
      {(formikProps) => (
        <Form>
          <VStack spacing={4} align="start">
            <HStack spacing={4} align="flex-end">
              <Field name="borrowing" validate={validateBorrowing}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.borrowing && !!form.touched.borrowing
                    }
                    style={{ maxWidth: '200px' }}
                  >
                    <FormLabel htmlFor="borrowing">借入額入力</FormLabel>
                    <Input
                      {...field}
                      id="borrowing"
                      type="number"
                      placeholder={YAMATO_SYMBOL.YEN}
                      data-e2e="borrowing-data-borrowamount"
                    />
                    <FormErrorMessage>{form.errors.borrowing}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                colorScheme="teal"
                isLoading={formikProps.isSubmitting}
                type="submit"
                data-e2e="borrowing-act-borrow"
              >
                借入実行
              </Button>
            </HStack>
            {borrowing > 0 && (
              <HStack spacing={4} align="flex-end">
                <label>変動予測値表示</label>
                <span>
                  {addToNum(props.debt, borrowing)}
                  {YAMATO_SYMBOL.YEN}
                  {', 担保率'}
                  {formatCollateralizationRatio(
                    props.collateral,
                    props.debt + borrowing
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
