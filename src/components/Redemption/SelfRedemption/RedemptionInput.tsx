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
import { useTranslation } from 'react-i18next';
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
import { getExpectedReward, getEthAmountFromCjpy } from '../shared/function';

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

  const { t } = useTranslation();

  const isCore = false;

  const [redemption, setRedemption] = useState<number | ''>();
  const formattedRedeemableCandidate = useMemo(
    () => getEthAmountFromCjpy(redeemableCandidate, rateOfEthJpy),
    [redeemableCandidate, rateOfEthJpy]
  );
  const expectedReward = useMemo(
    () =>
      redemption
        ? getExpectedReward(
            Math.min(redemption, formattedRedeemableCandidate.cjpy),
            isCore,
            GRR,
            rateOfEthJpy
          )
        : getExpectedReward(0, isCore, GRR, rateOfEthJpy),
    [redemption, formattedRedeemableCandidate, isCore, GRR, rateOfEthJpy]
  );

  const validateRedemption = useCallback(
    async (value: number | '') => {
      if (!account || !callback) {
        return t('redemption.selfRedemption.alert1');
      }

      if (!value) {
        setRedemption(value);
        return;
      }
      if (value > cjpy) {
        return t('redemption.selfRedemption.alert2');
      }

      if (value > formattedRedeemableCandidate.cjpy) {
        return t('redemption.selfRedemption.alert3');
      }

      // Value is correct
      setRedemption(value);
      return undefined;
    },
    [account, cjpy, formattedRedeemableCandidate, t, callback]
  );

  const submitRedemption = useCallback(
    async (
      values: { redemption: number | '' },
      formikHelpers: FormikHelpers<{
        redemption: number | '';
      }>
    ) => {
      console.debug('submit self redemption', values);

      if (!values.redemption) {
        return;
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const res = await callback!(
          'selfRedeem',
          values.redemption,
          expectedReward.eth
        );
        console.debug('self redemption done', res);
      } catch (error) {
        errorToast(error);
      }

      // reset
      setRedemption('');
      formikHelpers.resetForm();
    },
    [expectedReward, callback]
  );

  return (
    <Formik
      initialValues={{ redemption: '' as number | '' }}
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
                      text={t(
                        'redemption.selfRedemption.redemptionAmountInput'
                      )}
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
                  <CustomFormLabel
                    text={t(
                      'redemption.selfRedemption.predictedCollateralGainAmount'
                    )}
                  />
                  <Text>
                    {formatPrice(expectedReward.eth, 'eth').value}
                    {` `}
                    {YAMATO_SYMBOL.COLLATERAL}
                  </Text>
                </VStack>
              )}
            </GridItem>

            <GridItem colSpan={2}>
              <VStack align="start">
                <CustomFormLabel
                  text={t('redemption.selfRedemption.totalContenderRedemption')}
                />
                <Text>
                  {firstLoadCompleted ? (
                    <>
                      {
                        formatPrice(formattedRedeemableCandidate.cjpy, 'jpy')
                          .value
                      }
                      {` `}
                      {YAMATO_SYMBOL.YEN}
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
                  ({formatPrice(formattedRedeemableCandidate.eth, 'eth').value}
                  {` `}
                  {YAMATO_SYMBOL.COLLATERAL})
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
                  isDisabled={!redemption}
                >
                  {t('redemption.selfRedemption.redemptionExecution')}
                </CustomButton>
              </div>
            </GridItem>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
