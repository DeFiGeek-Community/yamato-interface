import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useCallback } from 'react';
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
  rateOfEthJpy: number;
  redemptionReserve: number;
  redeemableCandidate: number;
  GRR: number;
};

export default function RedemptionInput(props: Props) {
  const { rateOfEthJpy, redemptionReserve, redeemableCandidate, GRR } = props;

  const { account } = useActiveWeb3React();
  const { callback } = useCoreRedeemCallback();

  const formattedRedeemableCandidate = getRedeemableCandidate(
    redeemableCandidate,
    rateOfEthJpy
  );

  const submitRedemption = useCallback(
    async (
      values: { redemption: number },
      formikHelpers: FormikHelpers<{
        redemption: number;
      }>
    ) => {
      if (!account || !callback) {
        return `ウォレットを接続してください。またはネットワークを切り替えてください。`;
      }

      console.debug('submit core redemption', values);

      try {
        const res = await callback!(formattedRedeemableCandidate.eth);
        console.debug('core redemption done', res);
      } catch (error) {
        errorToast(error);
      }

      // reset
      formikHelpers.resetForm();
    },
    [account, formattedRedeemableCandidate, callback]
  );

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
                  {formatPrice(formattedRedeemableCandidate.eth, 'eth').value}
                  {YAMATO_SYMBOL.COLLATERAL}
                </Text>
                <Text>
                  ({formatPrice(formattedRedeemableCandidate.cjpy, 'jpy').value}
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
                        formattedRedeemableCandidate.eth + 1, // dummy
                        formattedRedeemableCandidate.eth,
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
