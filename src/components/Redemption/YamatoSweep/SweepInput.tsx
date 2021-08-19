import { Button, HStack, VStack } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useState } from 'react';
import { GRR, MCR, YAMATO_SYMBOL } from '../../../constants/yamato';
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
          <VStack mb={4}>
            <HStack spacing={4} align="flex-end">
              <VStack align="center">
                <label>プール総額</label>
                <span>
                  {props.redemptionReserve}
                  {YAMATO_SYMBOL.COLLATERAL}
                </span>
              </VStack>
              <VStack align="center">
                <label>弁済候補総額</label>
                <span>
                  {props.sweepableCandiate}
                  {YAMATO_SYMBOL.YEN}
                </span>
              </VStack>
              <VStack align="center">
                <label>実行リワード予測</label>
                <span>
                  {getExpectedReward()}
                  {YAMATO_SYMBOL.YEN}
                </span>
              </VStack>
              <Button
                colorScheme="teal"
                isLoading={formikProps.isSubmitting}
                type="submit"
              >
                代位弁済実行
              </Button>
            </HStack>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
