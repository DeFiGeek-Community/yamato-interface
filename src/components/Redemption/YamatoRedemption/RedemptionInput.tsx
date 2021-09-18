import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { formatPrice } from '../../../utils/prices';
import { CurrentValue, CustomButton, CustomFormLabel } from '../../CommonItem';
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
  const { totalCollateral, totalDebt, tcr, rateOfEthJpy, redemptionReserve } =
    props;

  const { account, library } = useActiveWeb3React();

  const redeemableCandidate = getRedeemableCandidate(
    totalCollateral,
    totalDebt,
    tcr,
    rateOfEthJpy
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
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            <GridItem colSpan={1}>
              <VStack align="start">
                <CustomFormLabel text={'プール総額'} />
                <CurrentValue>
                  {formatPrice(redemptionReserve, 'jpy').value}
                  {YAMATO_SYMBOL.YEN}
                </CurrentValue>
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <VStack align="start">
                <CustomFormLabel text={'償還候補総額'} />
                <CurrentValue>
                  {formatPrice(redeemableCandidate.eth, 'eth').value}
                  {YAMATO_SYMBOL.COLLATERAL}
                </CurrentValue>
                <CurrentValue>
                  ({formatPrice(redeemableCandidate.cjpy, 'jpy').value}
                  {YAMATO_SYMBOL.YEN})
                </CurrentValue>
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <VStack align="start">
                <CustomFormLabel text={'実行リワード予測'} />
                <CurrentValue>
                  {
                    formatPrice(
                      getExpectedCollateral(
                        redeemableCandidate.eth + 1, // dummy
                        redeemableCandidate.eth
                      ),
                      'eth'
                    ).value
                  }
                  {YAMATO_SYMBOL.COLLATERAL}
                </CurrentValue>
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <CustomButton
                colorScheme="teal"
                isLoading={formikProps.isSubmitting}
                type="submit"
              >
                Yamato償還実行
              </CustomButton>
            </GridItem>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
