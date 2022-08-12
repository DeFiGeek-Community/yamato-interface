import { Grid, GridItem, Skeleton, VStack } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useSweepCallback } from '../../../hooks/yamato/useSweep';
import { errorToast } from '../../../utils/errorToast';
import { formatPrice } from '../../../utils/prices';
import { Text, CustomButton, CustomFormLabel } from '../../CommonItem';
import { getExpectedReward } from '../shared/function';

type Props = {
  rateOfEthJpy: number;
  sweepReserve: number;
  sweepableCandiate: number;
  GRR: number;
  firstLoadCompleted: boolean;
};

export default function SweepInput(props: Props) {
  const {
    rateOfEthJpy,
    sweepReserve,
    sweepableCandiate,
    GRR,
    firstLoadCompleted,
  } = props;

  const { account } = useActiveWeb3React();
  const { callback } = useSweepCallback();

  const { t } = useTranslation();

  const isCore = true;

  const expectedReward = useMemo(
    () =>
      getExpectedReward(
        Math.min(sweepReserve, sweepableCandiate),
        isCore,
        GRR,
        rateOfEthJpy
      ),
    [sweepReserve, sweepableCandiate, isCore, GRR, rateOfEthJpy]
  );

  const submitSweep = useCallback(
    async (
      values: { sweep: number },
      formikHelpers: FormikHelpers<{
        sweep: number;
      }>
    ) => {
      if (!account || !callback) {
        return t('redemption.sweep.alert1');
      }

      console.debug('submit sweep', values);

      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const res = await callback!(expectedReward.cjpy);
        console.debug('sweep done', res);
      } catch (error) {
        errorToast(error);
      }

      // reset
      formikHelpers.resetForm();
    },
    [account, expectedReward, t, callback]
  );

  return (
    <Formik initialValues={{ sweep: 0 }} onSubmit={submitSweep}>
      {(formikProps) => (
        <Form>
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            <GridItem colSpan={1}>
              <VStack align="start">
                <CustomFormLabel text={t('redemption.sweep.totalPoolVolume')} />
                <Text>
                  {firstLoadCompleted ? (
                    <>
                      {formatPrice(sweepReserve, 'jpy').value}
                      {` `}
                      {YAMATO_SYMBOL.YEN}
                    </>
                  ) : (
                    <Skeleton
                      height="1.4rem"
                      width="5rem"
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
              <VStack align="start">
                <CustomFormLabel
                  text={t('redemption.sweep.totalContenderLiquidation')}
                />
                <Text>
                  {firstLoadCompleted ? (
                    <>
                      {formatPrice(sweepableCandiate, 'jpy').value}{' '}
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
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <VStack align="start">
                <CustomFormLabel
                  text={t('redemption.sweep.executionRewardPrediction')}
                />
                <Text>
                  {firstLoadCompleted ? (
                    <>
                      {formatPrice(expectedReward.cjpy, 'jpy').value}
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
                {/* <Text>
                  ({formatPrice(expectedReward.eth, 'eth').value}
                  {` `}
                  {YAMATO_SYMBOL.COLLATERAL})
                </Text> */}
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <CustomButton
                isLoading={formikProps.isSubmitting}
                type="submit"
                isDisabled={!expectedReward.cjpy}
              >
                {t('redemption.sweep.subrogationExecution')}
              </CustomButton>
            </GridItem>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
