import { Grid, GridItem, HStack, Stack, FormControl } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  CategoryTitle,
  ConentBox,
  HeaderBox1,
  CustomFormLabel,
  CustomInput,
} from '../CommonItem';
import { InfographicsContent, InfographicsHelp } from '../Infographics';

function InputField(props: {
  name: string;
  label: string;
  formik: any;
  onChange?: any;
}) {
  const { name, label, formik, onChange } = props;
  const onChangeHandler = onChange
    ? onChange
    : (e: any) => {
        const val = parseFloat(e.target.value);
        formik.setFieldValue(name, Number.isNaN(val) ? undefined : val);
      };

  return (
    <FormControl>
      <CustomFormLabel text={label} />
      <CustomInput type="number" id={name} onChange={onChangeHandler} />
    </FormControl>
  );
}

export default function InfographicsTool() {
  const { t } = useTranslation();
  return (
    <Formik initialValues={{}} onSubmit={() => undefined}>
      {(formik) => (
        <Form>
          <HeaderBox1>
            <HStack>
              <CategoryTitle>Infographics Simulator</CategoryTitle>
              <InfographicsHelp />
            </HStack>
          </HeaderBox1>
          <ConentBox>
            <Grid
              templateRows="repeat(5, 1fr)"
              templateColumns="repeat(2, 1fr)"
              gap={8}
            >
              <GridItem rowSpan={5} colSpan={1}>
                <InfographicsContent {...formik.values} />
              </GridItem>
              <GridItem rowSpan={5} colSpan={1}>
                <Stack>
                  <InputField
                    name="totalCollateral"
                    label={t('tools.totalCollateralVolume') + '(ETH)'}
                    formik={formik}
                  />
                  <InputField
                    name="totalDebt"
                    label={t('tools.totalBorrowVolume') + '(CJPY)'}
                    formik={formik}
                  />
                  <InputField
                    name="rateOfCjpyJpy"
                    label={'CJPY/JPY' + t('tools.exchangeRate')}
                    formik={formik}
                    onChange={(e: any) => {
                      const val = parseFloat(e.target.value);
                      formik.setFieldValue(
                        'rateOfCjpyJpy',
                        '' == e.target.value
                          ? undefined
                          : { manual: Number.isNaN(val) ? undefined : val }
                      );
                    }}
                  />
                  <InputField
                    name="rateOfEthJpy"
                    label={'ETH/JPY' + t('tools.exchangeRate')}
                    formik={formik}
                  />
                  <InputField
                    name="prevRateOfEthJpy"
                    label={
                      t('tools.immediately') +
                      ' ETH/JPY ' +
                      t('tools.exchangeRate')
                    }
                    formik={formik}
                  />
                  <InputField
                    name="redemptionReserve"
                    label={t('tools.redemptionPool') + '(CJPY)'}
                    formik={formik}
                  />
                  <InputField
                    name="prevRedemptionReserve"
                    label={t('tools.immediatelyRedemptionPool') + '(CJPY)'}
                    formik={formik}
                  />
                  <InputField
                    name="sweepReserve"
                    label={t('tools.liquidationPool') + '(CJPY)'}
                    formik={formik}
                  />
                  <InputField
                    name="prevSweepReserve"
                    label={t('tools.immediatelyLiquidationPool') + '(CJPY)'}
                    formik={formik}
                  />
                </Stack>
              </GridItem>
            </Grid>
          </ConentBox>
        </Form>
      )}
    </Formik>
  );
}
