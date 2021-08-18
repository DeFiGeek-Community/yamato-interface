import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import { useState } from 'react';
import { GRR, MCR, YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';

type Props = {
  totalCollateral: number;
  totalDebt: number;
  tcr: number;
  rateOfEthJpy: number;
};

export default function RedemptionInput(props: Props) {
  const { account, library } = useActiveWeb3React();

  const [redemption, setRedemption] = useState(0);

  function getRedeemableCandidate() {
    if (props.tcr >= MCR) {
      return 0;
    }

    const totalCollPerJpy = props.totalCollateral * props.rateOfEthJpy;
    return (props.totalDebt * MCR - totalCollPerJpy * 100) / MCR;
  }

  function getExpectedCollateral() {
    const redeemableAmount =
      redemption > getRedeemableCandidate()
        ? getRedeemableCandidate()
        : redemption;
    const redeemableAmountPerEth = redeemableAmount / props.rateOfEthJpy;

    const expectedCollateral = redeemableAmountPerEth * ((100 - GRR) / 100);
    return expectedCollateral;
  }

  async function validateRedemption(value: number) {
    if (value == null || typeof value !== 'number') {
      return '数値で入力してください。';
    }

    // FIXME: ウォレットのCJPY残高をチェックする
    // if (value > getRedeemableCandidate()) {
    //   return '残高が足りません。';
    // }

    if (value > getRedeemableCandidate()) {
      return '可能数量を超えています。';
    }

    // Value is correct
    setRedemption(value);
    return undefined;
  }

  function submitRedemption(
    values: { redemption: number },
    formikHelpers: FormikHelpers<{
      redemption: number;
    }>
  ) {
    console.log('submit redemption', values);
    // TODO: 償還実行。storeを使わずにabiを直接叩く。
    values.redemption;

    // reset
    setRedemption(0);
    formikHelpers.resetForm();
  }

  return (
    <Formik initialValues={{ redemption: 0 }} onSubmit={submitRedemption}>
      {(formikProps) => (
        <Form>
          <VStack mb={4}>
            <HStack spacing={4} align="flex-end">
              <Field name="redemption" validate={validateRedemption}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.redemption && !!form.touched.redemption
                    }
                    style={{ maxWidth: '200px' }}
                  >
                    <FormLabel htmlFor="redemption">償還実行額入力</FormLabel>
                    <Input
                      {...field}
                      id="redemption"
                      type="number"
                      placeholder={YAMATO_SYMBOL.YEN}
                    />
                    <FormErrorMessage>
                      {form.errors.redemption}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <HStack spacing={4} align="start">
                <label>償還候補総額</label>
                <p style={{ width: '150px' }}>
                  {getRedeemableCandidate().toFixed(4)}
                  {YAMATO_SYMBOL.YEN}
                </p>
              </HStack>
              <Button
                colorScheme="teal"
                isLoading={formikProps.isSubmitting}
                type="submit"
              >
                償還実行
              </Button>
            </HStack>
            {redemption > 0 && (
              <HStack spacing={4} align="flex-end">
                <label>予想担保獲得数</label>
                <span>
                  {getExpectedCollateral()}
                  {YAMATO_SYMBOL.COLLATERAL}
                </span>
              </HStack>
            )}
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
