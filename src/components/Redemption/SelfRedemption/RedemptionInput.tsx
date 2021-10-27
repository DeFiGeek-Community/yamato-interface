import {
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import { useCallback, useState } from 'react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useSelfRedeemCallback } from '../../../hooks/yamato/useSelfRedemption';
import { useWalletState } from '../../../state/wallet/hooks';
import { errorToast } from '../../../utils/errorToast';
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
  redeemableCandidate: number;
  rateOfEthJpy: number;
  GRR: number;
};

export default function RedemptionInput(props: Props) {
  const { redeemableCandidate, rateOfEthJpy, GRR } = props;

  const { account } = useActiveWeb3React();
  const { callback } = useSelfRedeemCallback();
  const { cjpy } = useWalletState();

  const [redemption, setRedemption] = useState(0);
  const formattedRedeemableCandidate = getRedeemableCandidate(
    redeemableCandidate,
    rateOfEthJpy
  );

  const validateRedemption = useCallback(
    async (value: number) => {
      if (!account || !callback) {
        return `ウォレットを接続してください。またはネットワークを切り替えてください。`;
      }

      if (value == null || typeof value !== 'number') {
        return '数値で入力してください。';
      }
      if (value > cjpy) {
        return '残高が足りません。';
      }

      if (value > formattedRedeemableCandidate.cjpy) {
        return '可能数量を超えています。';
      }

      // Value is correct
      setRedemption(value);
      return undefined;
    },
    [account, cjpy, formattedRedeemableCandidate, callback]
  );

  const submitRedemption = useCallback(
    async (
      values: { redemption: number },
      formikHelpers: FormikHelpers<{
        redemption: number;
      }>
    ) => {
      console.debug('submit self redemption', values);

      try {
        const res = await callback!(
          values.redemption,
          formattedRedeemableCandidate.eth
        );
        console.debug('self redemption done', res);
      } catch (error) {
        errorToast(error);
      }

      // reset
      setRedemption(0);
      formikHelpers.resetForm();
    },
    [formattedRedeemableCandidate, callback]
  );

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
                          formattedRedeemableCandidate.eth,
                          GRR
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
                  {formatPrice(formattedRedeemableCandidate.eth, 'eth').value}
                  {YAMATO_SYMBOL.COLLATERAL}
                </Text>
                <Text>
                  ({formatPrice(formattedRedeemableCandidate.cjpy, 'jpy').value}
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
