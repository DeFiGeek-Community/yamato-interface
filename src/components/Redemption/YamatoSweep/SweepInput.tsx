import { Button, Grid, GridItem, VStack } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';

type Props = {
  totalCollateral: number;
  totalDebt: number;
  tcr: number;
  rateOfEthJpy: number;
  redemptionReserve: number;
  sweepReserve: number;
  sweepableCandiate: number;
};

export default function SweepInput(props: Props) {
  const { account, library } = useActiveWeb3React();

  function getExpectedReward() {
    const amount =
      props.sweepReserve > props.sweepableCandiate
        ? props.sweepableCandiate
        : props.sweepReserve;

    const reward = amount * 0.01;
    return reward;
  }

  function submitSweep(
    values: { sweep: number },
    formikHelpers: FormikHelpers<{
      sweep: number;
    }>
  ) {
    console.log('submit Sweep', values);
    // TODO: 弁済実行。storeを使わずにabiを直接叩く。
    values.sweep;

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
                <label>プール総額</label>
                <span>
                  {props.redemptionReserve.toFixed(4)}
                  {YAMATO_SYMBOL.YEN}
                </span>
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <VStack align="start">
                <label>弁済候補総額</label>
                <span>
                  {props.sweepableCandiate.toFixed(4)}
                  {YAMATO_SYMBOL.COLLATERAL}
                </span>
                <span>
                  ({(props.sweepableCandiate * props.rateOfEthJpy).toFixed(4)}
                  {YAMATO_SYMBOL.YEN})
                </span>
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <VStack align="start">
                <label>実行リワード予測</label>
                <span>
                  {getExpectedReward().toFixed(4)}
                  {YAMATO_SYMBOL.YEN}
                </span>
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <Button
                colorScheme="teal"
                isLoading={formikProps.isSubmitting}
                type="submit"
              >
                代位弁済実行
              </Button>
            </GridItem>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
