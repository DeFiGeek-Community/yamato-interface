import {
  FormControl,
  FormErrorMessage,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import { useState } from 'react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useRepayDebt } from '../../../state/pledge/hooks';
import { subtractToNum } from '../../../utils/bignumber';
import {
  formatCollateralizationRatio,
  formatPrice,
} from '../../../utils/prices';
import { CustomButton, CustomFormLabel, CustomInput } from '../../CommonItem';

type Props = { collateral: number; debt: number; rateOfEthJpy: number };

export default function RepayInput(props: Props) {
  const { collateral, debt, rateOfEthJpy } = props;

  const repayDebt = useRepayDebt();

  const [repayment, setRepayment] = useState(0);

  function validateRepayment(value: number) {
    if (value == null || typeof value !== 'number') {
      return '数値で入力してください。';
    }
    if (value > debt) {
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
            <HStack spacing={4}>
              <Field name="repayment" validate={validateRepayment}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.repayment && !!form.touched.repayment
                    }
                    style={{ maxWidth: '200px' }}
                  >
                    <CustomFormLabel htmlFor="repayment" text="引出量入力" />
                    <CustomInput
                      {...field}
                      id="repayment"
                      type="number"
                      placeholder={YAMATO_SYMBOL.YEN}
                      data-testid="borrowing-data-repayAmount"
                    />
                    <FormErrorMessage>{form.errors.repayment}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <CustomButton
                isLoading={formikProps.isSubmitting}
                type="submit"
                data-testid="borrowing-act-repay"
              >
                返済実行
              </CustomButton>
            </HStack>
            {repayment > 0 && (
              <HStack spacing={4} align="flex-end">
                <CustomFormLabel
                  text={`変動予測値表示...${
                    formatPrice(subtractToNum(debt, repayment), 'jpy').value
                  }${YAMATO_SYMBOL.YEN}, 担保率${formatCollateralizationRatio(
                    collateral * rateOfEthJpy,
                    debt - repayment
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
