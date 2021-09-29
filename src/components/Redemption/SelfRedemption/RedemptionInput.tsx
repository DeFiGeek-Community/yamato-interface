import {
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import { useState } from 'react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useWalletState } from '../../../state/wallet/hooks';
import { formatPrice } from '../../../utils/prices';
import {
  Text,
  CustomButton,
  CustomFormLabel,
  CustomInput,
} from '../../CommonItem';
import {
  getExpectedCollateral,
  getRedeemableCandidate,
} from '../shared/function';

type Props = {
  totalCollateral: number;
  totalDebt: number;
  tcr: number;
  rateOfEthJpy: number;
};

export default function RedemptionInput(props: Props) {
  const { totalCollateral, totalDebt, tcr, rateOfEthJpy } = props;

  const { cjpy } = useWalletState();

  const [redemption, setRedemption] = useState(0);
  const redeemableCandidate = getRedeemableCandidate(
    totalCollateral,
    totalDebt,
    tcr,
    rateOfEthJpy
  );

  async function validateRedemption(value: number) {
    if (value == null || typeof value !== 'number') {
      return '数値で入力してください。';
    }
    if (value > cjpy) {
      return '残高が足りません。';
    }

    if (value > redeemableCandidate.cjpy) {
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
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            <GridItem colSpan={1}>
              <Field name="redemption" validate={validateRedemption}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.redemption && !!form.touched.redemption
                    }
                    style={{ maxWidth: '200px' }}
                  >
                    <CustomFormLabel
                      htmlFor="redemption"
                      text="償還実行量入力"
                    />
                    <CustomInput
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
              {redemption > 0 && (
                <VStack align="start" mt={4}>
                  <CustomFormLabel text="予想担保獲得量" />
                  <Text>
                    {
                      formatPrice(
                        getExpectedCollateral(
                          redemption,
                          redeemableCandidate.eth
                        ),
                        'eth'
                      ).value
                    }
                    {YAMATO_SYMBOL.COLLATERAL}
                  </Text>
                </VStack>
              )}
            </GridItem>

            <GridItem colSpan={2}>
              <VStack align="start">
                <CustomFormLabel text="償還候補総量" />
                <Text>
                  {formatPrice(redeemableCandidate.eth, 'eth').value}
                  {YAMATO_SYMBOL.COLLATERAL}
                </Text>
                <Text>
                  ({formatPrice(redeemableCandidate.cjpy, 'jpy').value}
                  {YAMATO_SYMBOL.YEN})
                </Text>
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <div
                style={{
                  marginTop: '1.5rem',
                }}
              >
                <CustomButton
                  isLoading={formikProps.isSubmitting}
                  type="submit"
                >
                  償還実行
                </CustomButton>
              </div>
            </GridItem>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
