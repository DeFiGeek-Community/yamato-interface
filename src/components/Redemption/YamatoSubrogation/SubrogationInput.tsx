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
};

export default function SubrogationInput(props: Props) {
  const { account, library } = useActiveWeb3React();

  const [redemption, setRedemption] = useState(0);

  function getRedeemableCandidate() {
    if (props.tcr >= MCR) {
      return 0;
    }

    const totalCollPerJpy = props.totalCollateral * props.rateOfEthJpy;
    return (props.totalDebt * MCR - totalCollPerJpy * 100) / MCR;
  }

  function getExpectedReward() {
    const redeemableAmount =
      redemption > getRedeemableCandidate()
        ? getRedeemableCandidate()
        : redemption;
    const redeemableAmountPerEth = redeemableAmount / props.rateOfEthJpy;

    const expectedCollateral = redeemableAmountPerEth * ((100 - GRR) / 100);
    return expectedCollateral;
  }

  function submitSubrogation(
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
    <Formik initialValues={{ redemption: 0 }} onSubmit={submitSubrogation}>
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
                  {getRedeemableCandidate()}
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
