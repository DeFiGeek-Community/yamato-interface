import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useCoreRedeemCallback } from '../../../hooks/yamato/useCoreRedemption';
import { errorToast } from '../../../utils/errorToast';
import { formatPrice } from '../../../utils/prices';
import { Text, CustomButton, CustomFormLabel } from '../../CommonItem';
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
  MCR: number;
  GRR: number;
};

export default function RedemptionInput(props: Props) {
  const {
    totalCollateral,
    totalDebt,
    tcr,
    rateOfEthJpy,
    redemptionReserve,
    MCR,
    GRR,
  } = props;

  const { account } = useActiveWeb3React();
  const { callback } = useCoreRedeemCallback();

  const redeemableCandidate = getRedeemableCandidate(
    totalCollateral,
    totalDebt,
    tcr,
    rateOfEthJpy,
    MCR
  );

  async function submitRedemption(
    values: { redemption: number },
    formikHelpers: FormikHelpers<{
      redemption: number;
    }>
  ) {
    if (!account || !callback) {
      return `ウォレットを接続してください。またはネットワークを切り替えてください。`;
    }

    console.debug('submit core redemption', values);

    try {
      const res = await callback!(redeemableCandidate.eth);
      console.debug('core redemption done', res);
    } catch (error) {
      errorToast(error);
    }

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
                <CustomFormLabel text={'プール総量'} />
                <Text>
                  {formatPrice(redemptionReserve, 'jpy').value}
                  {YAMATO_SYMBOL.YEN}
                </Text>
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <VStack align="start">
                <CustomFormLabel text={'償還候補総量'} />
                <Text>
                  {formatPrice(redeemableCandidate.eth, 'eth').value}
                  {YAMATO_SYMBOL.COLLATERAL}
                </Text>
                <Text>
                  ({formatPrice(redeemableCandidate.cjpy, 'jpy').value}
                  {YAMATO_SYMBOL.YEN})
                </Text>
              </VStack>
            </GridItem>

            <GridItem colSpan={1}>
              <VStack align="start">
                <CustomFormLabel text={'実行リワード予測'} />
                <Text>
                  {
                    formatPrice(
                      getExpectedCollateral(
                        redeemableCandidate.eth + 1, // dummy
                        redeemableCandidate.eth,
                        GRR
                      ),
                      'eth'
                    ).value
                  }
                  {YAMATO_SYMBOL.COLLATERAL}
                </Text>
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
