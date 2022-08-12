import { Grid, GridItem, Skeleton, VStack } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useRedeemCallback } from '../../../hooks/yamato/useRedemption';
import { errorToast } from '../../../utils/errorToast';
import { formatPrice } from '../../../utils/prices';
import { Text, CustomButton, CustomFormLabel } from '../../CommonItem';
import { getExpectedReward, getEthAmountFromCjpy } from '../shared/function';

type Props = {
  rateOfEthJpy: number;
  redemptionReserve: number;
  redeemableCandidate: number;
  GRR: number;
  firstLoadCompleted: boolean;
};

export default function RedemptionInput(props: Props) {
  const {
    rateOfEthJpy,
    redemptionReserve,
    redeemableCandidate,
    GRR,
    firstLoadCompleted,
  } = props;

  const { account } = useActiveWeb3React();
  const { callback } = useRedeemCallback();

  const { t } = useTranslation();

  const isCore = true;

  const formattedRedeemableCandidate = useMemo(
    () => getEthAmountFromCjpy(redeemableCandidate, rateOfEthJpy),
    [redeemableCandidate, rateOfEthJpy]
  );
  const formattedRedemptionReserve = useMemo(
    () => getEthAmountFromCjpy(redemptionReserve, rateOfEthJpy),
    [redemptionReserve, rateOfEthJpy]
  );
  const expectedReward = useMemo(
    () =>
      getExpectedReward(
        Math.min(redemptionReserve, formattedRedeemableCandidate.cjpy),
        isCore,
        GRR,
        rateOfEthJpy
      ),
    [redemptionReserve, formattedRedeemableCandidate, isCore, GRR, rateOfEthJpy]
  );

  const submitRedemption = useCallback(
    async (
      values: { redemption: number },
      formikHelpers: FormikHelpers<{
        redemption: number;
      }>
    ) => {
      if (!account || !callback) {
        return t('redemption.coreRedemption.alert1');
      }

      console.debug('submit core redemption', values);

      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const res = await callback!(
          'coreRedeem',
          expectedReward.cjpy,
          expectedReward.eth
        );
        console.debug('core redemption done', res);
      } catch (error) {
        errorToast(error);
      }

      // reset
      formikHelpers.resetForm();
    },
    [account, expectedReward, t, callback]
  );

  return (
    <Formik initialValues={{ redemption: 0 }} onSubmit={submitRedemption}>
      {(formikProps) => (
        <Form>
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            <GridItem colSpan={1}>
              <VStack align="start">
                <CustomFormLabel
                  text={t('redemption.coreRedemption.totalPoolVolume')}
                />
                <Text>
                  {firstLoadCompleted ? (
                    <>
                      {
                        formatPrice(formattedRedemptionReserve.cjpy, 'jpy')
                          .value
                      }
                      {` `}
                      {YAMATO_SYMBOL.YEN}
                    </>
                  ) : (
                    <Skeleton
                      height="1.4rem"
                      width="5rem"
                      style={{
                        lineHeight: '1.4rem',
                      }}
                    />
                  )}
                </Text>
                <Text>
                  ({formatPrice(formattedRedemptionReserve.eth, 'eth').value}
                  {` `}
                  {YAMATO_SYMBOL.COLLATERAL})
                </Text>
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <VStack align="start">
                <CustomFormLabel
                  text={t('redemption.coreRedemption.totalContenderRedemption')}
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
              <VStack align="start">
                <CustomFormLabel
                  text={t(
                    'redemption.coreRedemption.executionRewardPrediction'
                  )}
                />
                <Text>
                  {firstLoadCompleted ? (
                    <>
                      {formatPrice(expectedReward.eth, 'eth').value}
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
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <CustomButton
                colorScheme="teal"
                isLoading={formikProps.isSubmitting}
                type="submit"
                isDisabled={!expectedReward.eth}
              >
                {'Yamato' + t('redemption.coreRedemption.redemptionExecution')}
              </CustomButton>
            </GridItem>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
