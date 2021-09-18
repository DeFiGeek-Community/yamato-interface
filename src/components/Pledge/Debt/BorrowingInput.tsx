import {
  FormControl,
  FormErrorMessage,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import { useState } from 'react';
import { MCR, YAMATO_SYMBOL } from '../../../constants/yamato';
import { useBorrowDebt } from '../../../state/pledge/hooks';
import { addToNum } from '../../../utils/bignumber';
import {
  formatCollateralizationRatio,
  formatPrice,
} from '../../../utils/prices';
import { CustomButton, CustomFormLabel, CustomInput } from '../../CommonItem';

type Props = { collateral: number; debt: number; rateOfEthJpy: number };

export default function BorrowingInput(props: Props) {
  const { collateral, debt, rateOfEthJpy } = props;

  const borrowDebt = useBorrowDebt();

  const [borrowing, setBorrowing] = useState(0);

  async function validateBorrowing(value: number) {
    if (value == null || typeof value !== 'number') {
      return '数値で入力してください。';
    }

    const sum = debt + value;
    const collateralRatio = ((collateral * rateOfEthJpy) / sum) * 100;
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
            <HStack spacing={4}>
              <Field name="borrowing" validate={validateBorrowing}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.borrowing && !!form.touched.borrowing
                    }
                    style={{ maxWidth: '200px' }}
                  >
                    <CustomFormLabel htmlFor="borrowing" text="借入額入力" />
                    <CustomInput
                      {...field}
                      id="borrowing"
                      type="number"
                      placeholder={YAMATO_SYMBOL.YEN}
                      data-testid="borrowing-data-borrowAmount"
                    />
                    <FormErrorMessage>{form.errors.borrowing}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <CustomButton
                isLoading={formikProps.isSubmitting}
                type="submit"
                data-testid="borrowing-act-borrow"
              >
                借入実行
              </CustomButton>
            </HStack>
            {borrowing > 0 && (
              <HStack spacing={4} align="flex-end">
                <CustomFormLabel
                  text={`変動予測値表示...${
                    formatPrice(addToNum(debt, borrowing), 'jpy').value
                  }${YAMATO_SYMBOL.YEN}, 担保率${formatCollateralizationRatio(
                    collateral * rateOfEthJpy,
                    debt + borrowing
                  )}%`}
                />
              </HStack>
            )}
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
