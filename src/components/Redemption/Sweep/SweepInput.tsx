import { Grid, GridItem, Skeleton, VStack } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useCallback } from 'react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useSweepCallback } from '../../../hooks/yamato/useSweep';
import { errorToast } from '../../../utils/errorToast';
import { formatPrice } from '../../../utils/prices';
import { Text, CustomButton, CustomFormLabel } from '../../CommonItem';

type Props = {
  rateOfEthJpy: number;
  sweepReserve: number;
  sweepableCandiate: number;
  firstLoadCompleted: boolean;
};

export default function SweepInput(props: Props) {
  const { sweepReserve, sweepableCandiate, firstLoadCompleted } = props;

  const { account } = useActiveWeb3React();
  const { callback } = useSweepCallback();

  const getExpectedReward = useCallback(() => {
    const amount =
      sweepReserve > sweepableCandiate ? sweepableCandiate : sweepReserve;

    const reward = amount * 0.01;
    return reward;
  }, [sweepReserve, sweepableCandiate]);

  const submitSweep = useCallback(
    async (
      values: { sweep: number },
      formikHelpers: FormikHelpers<{
        sweep: number;
      }>
    ) => {
      if (!account || !callback) {
        return `ウォレットを接続してください。またはネットワークを切り替えてください。`;
      }

      console.debug('submit sweep', values);

      try {
        const res = await callback!(getExpectedReward());
        console.debug('sweep done', res);
      } catch (error) {
        errorToast(error);
      }

      // reset
      formikHelpers.resetForm();
    },
    [account, getExpectedReward, callback]
  );

  return (
    <Formik initialValues={{ sweep: 0 }} onSubmit={submitSweep}>
      {(formikProps) => (
        <Form>
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            <GridItem colSpan={1}>
              <VStack align="start">
                <CustomFormLabel text={'プール総量'} />
                <Text>
                  {firstLoadCompleted ? (
                    <>
                      {formatPrice(sweepReserve, 'jpy').value}
                      {YAMATO_SYMBOL.YEN}
                    </>
                  ) : (
                    <Skeleton height="1.6rem" width="7rem" />
                  )}
                </Text>
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <VStack align="start">
                <CustomFormLabel text={'弁済候補総量'} />
                <Text>
                  {firstLoadCompleted ? (
                    <>{formatPrice(sweepableCandiate, 'jpy').value}</>
                  ) : (
                    <Skeleton
                      height="1.4rem"
                      width="5rem"
                      style={{
                        display: 'inline-block',
                        verticalAlign: 'middle',
                      }}
                    />
                  )}
                  {YAMATO_SYMBOL.YEN}
                </Text>
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <VStack align="start">
                <CustomFormLabel text={'実行リワード予測'} />
                <Text>
                  {firstLoadCompleted ? (
                    <>{formatPrice(getExpectedReward(), 'jpy').value}</>
                  ) : (
                    <Skeleton
                      height="1.4rem"
                      width="5rem"
                      style={{
                        display: 'inline-block',
                        verticalAlign: 'middle',
                      }}
                    />
                  )}
                  {YAMATO_SYMBOL.YEN}
                </Text>
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <CustomButton isLoading={formikProps.isSubmitting} type="submit">
                代位弁済実行
              </CustomButton>
            </GridItem>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
