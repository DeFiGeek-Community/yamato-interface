import {
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Skeleton,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useRedeemCallback } from '../../../hooks/yamato/useRedemption';
import { useWalletState } from '../../../state/wallet/hooks';
import { errorToast } from '../../../utils/errorToast';
import { formatPrice } from '../../../utils/prices';
import {
  Text,
  CustomButton,
  CustomFormLabel,
  CustomInput,
} from '../../CommonItem';
import { getExpectedReward, getRedeemableCandidate } from '../shared/function';

type Props = {
  redeemableCandidate: number;
  rateOfEthJpy: number;
  GRR: number;
  firstLoadCompleted: boolean;
};

export default function RedemptionInput(props: Props) {
  const { redeemableCandidate, rateOfEthJpy, GRR, firstLoadCompleted } = props;

  const { account } = useActiveWeb3React();
  const { callback } = useRedeemCallback();
  const { cjpy } = useWalletState();

  const [redemption, setRedemption] = useState<number | string>();
  const formattedRedeemableCandidate = useMemo(
    () => getRedeemableCandidate(redeemableCandidate, rateOfEthJpy),
    [redeemableCandidate, rateOfEthJpy]
  );

  const validateRedemption = useCallback(
    async (value: number | string) => {
      if (!account || !callback) {
        return `ウォレットを接続してください。またはネットワークを切り替えてください。`;
      }

      if (value !== '' && typeof value !== 'number') {
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
      values: { redemption: number | string },
      formikHelpers: FormikHelpers<{
        redemption: number | string;
      }>
    ) => {
      console.debug('submit self redemption', values);

      if (typeof values.redemption !== 'number') {
        return;
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const res = await callback!(
          'selfRedeem',
          values.redemption,
          formattedRedeemableCandidate.eth
        );
        console.debug('self redemption done', res);
      } catch (error) {
        errorToast(error);
      }

      // reset
      setRedemption('');
      formikHelpers.resetForm();
    },
    [formattedRedeemableCandidate, callback]
  );

  return (
    <Formik
      initialValues={{ redemption: '' as number | string }}
      onSubmit={submitRedemption}
    >
      {(formikProps) => (
        <Form>
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            <GridItem colSpan={1}>
              <Field name="redemption" validate={validateRedemption}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={!!form.errors.redemption}
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
              {typeof redemption === 'number' && redemption > 0 && (
                <VStack align="start" mt={4}>
                  <CustomFormLabel text="予想担保獲得量" />
                  <Text>
                    {
                      formatPrice(
                        getExpectedReward(redemption, false, GRR, rateOfEthJpy)
                          .eth,
                        'eth'
                      ).value
                    }
                    {` `}
                    {YAMATO_SYMBOL.COLLATERAL}
                  </Text>
                </VStack>
              )}
            </GridItem>

            <GridItem colSpan={2}>
              <VStack align="start">
                <CustomFormLabel text="償還候補総量" />
                <Text>
                  {firstLoadCompleted ? (
                    <>
                      {
                        formatPrice(formattedRedeemableCandidate.eth, 'eth')
                          .value
                      }
                      {` `}
                      {YAMATO_SYMBOL.COLLATERAL}
                    </>
                  ) : (
                    <Skeleton
                      height="1.4rem"
                      width="4rem"
                      style={{
                        display: 'inline-block',
                        lineHeight: '1.4rem',
                      }}
                    />
                  )}
                </Text>
                <Text>
                  ({formatPrice(formattedRedeemableCandidate.cjpy, 'jpy').value}
                  {` `}
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
                  isDisabled={typeof redemption !== 'number'}
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
