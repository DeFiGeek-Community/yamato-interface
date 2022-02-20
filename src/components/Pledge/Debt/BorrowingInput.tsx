import {
  FormControl,
  FormErrorMessage,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useBorrowCallback } from '../../../hooks/yamato/useBorrowCallback';
import { addToNum, divideToNum } from '../../../utils/bignumber';
import { calcFee } from '../../../utils/calcFee';
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
  MCR: number;
};

export default function BorrowingInput(props: Props) {
  const { collateral, debt, rateOfEthJpy, MCR } = props;

  const { account } = useActiveWeb3React();
  const { callback } = useBorrowCallback();

  const [borrowing, setBorrowing] = useState<number | string>();

  const feeResult = useMemo(() => {
    if (typeof borrowing === 'number') {
      if (debt + borrowing <= 0) {
        return { fee: 0, feeRate: 0 };
      }
      const ICR =
        divideToNum(collateral * rateOfEthJpy, debt + borrowing) * 100;
      return calcFee(borrowing, ICR);
    } else {
      return { fee: 0, feeRate: 0 };
    }
  }, [collateral, debt, borrowing, rateOfEthJpy]);

  const validateBorrowing = useCallback(
    async (value: number | string) => {
      if (!account || !callback) {
        return `ウォレットを接続してください。またはネットワークを切り替えてください。`;
      }

      if (typeof value === 'number') {
        const sum = debt + value;
        if (sum <= 0) {
          return '数値で入力してください。';
        }
        const collateralRatio = ((collateral * rateOfEthJpy) / sum) * 100;
        if (MCR > collateralRatio) {
          return `担保率は最低${MCR}%が必要です。`;
        }
      } else if (value !== '') {
        return '数値で入力してください。';
      }

      // Value is correct
      setBorrowing(value);
      return undefined;
    },
    [account, collateral, debt, rateOfEthJpy, MCR, callback]
  );

  const submitBorrowing = useCallback(
    async (
      values: { borrowing: string },
      formikHelpers: FormikHelpers<{
        borrowing: string;
      }>
    ) => {
      console.debug('submit borrowing', values);

      if (typeof values.borrowing === 'number') {
        try {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const res = await callback!(values.borrowing);
          console.debug('borrowing done', res);
        } catch (error) {
          errorToast(error);
        }

        // reset
        setBorrowing('');
        formikHelpers.resetForm();
      }
    },
    [callback]
  );

  return (
    <Formik initialValues={{ borrowing: '' }} onSubmit={submitBorrowing}>
      {(formikProps) => (
        <Form>
          <VStack spacing={4} align="start">
            <HStack
              spacing={4}
              align={
                formikProps.errors.borrowing && formikProps.touched.borrowing
                  ? 'center'
                  : 'end'
              }
            >
              <Field name="borrowing" validate={validateBorrowing}>
                {({ field }: FieldProps) => (
                  <FormControl
                    isInvalid={!!formikProps.errors.borrowing}
                    style={{ maxWidth: '200px' }}
                  >
                    <CustomFormLabel htmlFor="borrowing" text="借入量入力" />
                    <CustomInput
                      {...field}
                      id="borrowing"
                      type="number"
                      placeholder={YAMATO_SYMBOL.YEN}
                      data-testid="borrowing-data-borrowAmount"
                    />
                    <FormErrorMessage>
                      {formikProps.errors.borrowing}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <CustomButton
                isLoading={formikProps.isSubmitting}
                type="submit"
                data-testid="borrowing-act-borrow"
                isDisabled={typeof borrowing !== 'number'}
              >
                借入実行
              </CustomButton>
            </HStack>
            {typeof borrowing === 'number' && borrowing > 0 && (
              <VStack spacing={4} align="start">
                <CustomFormLabel
                  text={`変動予測値 ${
                    formatPrice(
                      addToNum(debt, borrowing - feeResult.fee),
                      'jpy'
                    ).value
                  } ${YAMATO_SYMBOL.YEN}`}
                />
                <CustomFormLabel
                  text={`担保率 ${formatCollateralizationRatio(
                    collateral * rateOfEthJpy,
                    debt + borrowing
                  )}%`}
                />
                <CustomFormLabel
                  text={`手数料 ${formatPrice(feeResult.fee, 'jpy').value} ${
                    YAMATO_SYMBOL.YEN
                  }(手数料率 ${feeResult.feeRate.toFixed(2)}%)`}
                />
              </VStack>
            )}
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
