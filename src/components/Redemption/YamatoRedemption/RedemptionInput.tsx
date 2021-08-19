import { Button, HStack, VStack } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import {
  getExpectedCollateral,
  getRedeemableCandidate,
} from '../shared/function';

type Props = {
  totalCollateral: number;
  totalDebt: number;
  tcr: number;
  rateOfEthJpy: number;
  redemptionReserve: number;
};

export default function RedemptionInput(props: Props) {
  const { account, library } = useActiveWeb3React();

  const redeemableCandidate = getRedeemableCandidate(
    props.totalCollateral,
    props.totalDebt,
    props.tcr,
    props.rateOfEthJpy
  );

  function submitRedemption(
    values: { redemption: number },
    formikHelpers: FormikHelpers<{
      redemption: number;
    }>
  ) {
    console.log('submit redemption', values);
    // TODO: 償還実行。storeを使わずにabiを直接叩く。
    values.redemption;

    // reset
    formikHelpers.resetForm();
  }

  return (
    <Formik initialValues={{ redemption: 0 }} onSubmit={submitRedemption}>
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
                <label>償還候補総額</label>
                <span>
                  {redeemableCandidate}
                  {YAMATO_SYMBOL.YEN}
                </span>
              </VStack>
              <VStack align="center">
                <label>実行リワード予測</label>
                <span>
                  {getExpectedCollateral(
                    redeemableCandidate + 1, // dummy
                    redeemableCandidate,
                    props.rateOfEthJpy
                  )}
                  {YAMATO_SYMBOL.COLLATERAL}
                </span>
              </VStack>
              <Button
                colorScheme="teal"
                isLoading={formikProps.isSubmitting}
                type="submit"
              >
                Yamato償還実行
              </Button>
            </HStack>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
