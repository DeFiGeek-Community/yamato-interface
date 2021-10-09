import {
  FormControl,
  FormErrorMessage,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import { useState } from 'react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useDepositCallback } from '../../../hooks/yamato/useDepositCallback';
import { useWalletState } from '../../../state/wallet/hooks';
import { addToNum } from '../../../utils/bignumber';
import { errorToast } from '../../../utils/errorToast';
import {
  formatCollateralizationRatio,
  formatPrice,
} from '../../../utils/prices';
import { CustomButton, CustomFormLabel, CustomInput } from '../../CommonItem';

type Props = { collateral: number; debt: number; rateOfEthJpy: number };

export default function DepositInput(props: Props) {
  const { collateral, debt, rateOfEthJpy } = props;

  const { account } = useActiveWeb3React();
  const { callback } = useDepositCallback();
  const { eth } = useWalletState();

  const [deposit, setDeposit] = useState(0);

  async function validateDeposit(value: number) {
    if (!account || !callback) {
      return `ウォレットを接続してください。`;
    }

    if (value == null || typeof value !== 'number') {
      return '数値で入力してください。';
    }
    if (value > eth) {
      return '残高を超えています。';
    }

    // Value is correct
    setDeposit(value);
    return undefined;
  }

  async function submitDeposit(
    values: { deposit: number },
    formikHelpers: FormikHelpers<{
      deposit: number;
    }>
  ) {
    console.debug('submit deposit', values);
    if (values.deposit <= 0) {
      errorToast('預入量が0です。');
      return;
    }

    try {
      const res = await callback!(values.deposit);
      console.debug('deposit done', res);
    } catch (error) {
      errorToast(error);
    }

    // reset
    setDeposit(0);
    formikHelpers.resetForm();
  }

  return (
    <Formik initialValues={{ deposit: 0 }} onSubmit={submitDeposit}>
      {(formikProps) => (
        <Form>
          <VStack spacing={4} align="start">
            <HStack
              spacing={4}
              align={formikProps.errors.deposit ? 'center' : 'end'}
            >
              <Field name="deposit" validate={validateDeposit}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!formikProps.errors.deposit && !!form.touched.deposit
                    }
                    style={{ maxWidth: '200px' }}
                  >
                    <CustomFormLabel htmlFor="deposit" text="預入量入力" />
                    <CustomInput
                      {...field}
                      id="deposit"
                      type="number"
                      placeholder={YAMATO_SYMBOL.COLLATERAL}
                      data-testid="collateral-data-depositAmount"
                    />
                    <FormErrorMessage>
                      {formikProps.errors.deposit}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <CustomButton
                isLoading={formikProps.isSubmitting}
                type="submit"
                data-testid="collateral-act-deposit"
              >
                預入実行
              </CustomButton>
            </HStack>
            {deposit > 0 && (
              <HStack spacing={4} align="flex-end">
                <CustomFormLabel
                  text={`変動予測値表示...${
                    formatPrice(addToNum(collateral, deposit), 'jpy').value
                  }${
                    YAMATO_SYMBOL.COLLATERAL
                  }, 担保率${formatCollateralizationRatio(
                    (collateral + deposit) * rateOfEthJpy,
                    debt
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
