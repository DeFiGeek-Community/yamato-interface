import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
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
};

export default function SweepInput(props: Props) {
  const { sweepReserve, sweepableCandiate } = props;

  const { account } = useActiveWeb3React();
  const { callback } = useSweepCallback();

  function getExpectedReward() {
    const amount =
      sweepReserve > sweepableCandiate ? sweepableCandiate : sweepReserve;

    const reward = amount * 0.01;
    return reward;
  }

  async function submitSweep(
    values: { sweep: number },
    formikHelpers: FormikHelpers<{
      sweep: number;
    }>
  ) {
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
  }

  return (
    <Formik initialValues={{ sweep: 0 }} onSubmit={submitSweep}>
      {(formikProps) => (
        <Form>
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            <GridItem colSpan={1}>
              <VStack align="start">
                <CustomFormLabel text={'プール総量'} />
                <Text>
                  {formatPrice(sweepReserve, 'jpy').value}
                  {YAMATO_SYMBOL.YEN}
                </Text>
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <VStack align="start">
                <CustomFormLabel text={'弁済候補総量'} />
                <Text>
                  {formatPrice(sweepableCandiate, 'jpy').value}
                  {YAMATO_SYMBOL.YEN}
                </Text>
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <VStack align="start">
                <CustomFormLabel text={'実行リワード予測'} />
                <Text>
                  {formatPrice(getExpectedReward(), 'jpy').value}
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
