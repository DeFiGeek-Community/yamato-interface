import { Grid, GridItem, HStack, Stack, FormControl } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
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
      <CustomInput id={name} onChange={onChangeHandler} />
    </FormControl>
  );
}

export default function InfographicsTool() {
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
                    label="担保総額(ETH)"
                    formik={formik}
                  />
                  <InputField
                    name="totalDebt"
                    label="借入総額(CJPY)"
                    formik={formik}
                  />
                  <InputField
                    name="rateOfCjpyJpy"
                    label="CJPY/JPY 交換レート"
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
                    label="ETH/JPY 交換レート"
                    formik={formik}
                  />
                  <InputField
                    name="prevRateOfEthJpy"
                    label="直前の ETH/JPY 交換レート"
                    formik={formik}
                  />
                  <InputField
                    name="redemptionReserve"
                    label="償還プール(CJPY)"
                    formik={formik}
                  />
                  <InputField
                    name="prevRedemptionReserve"
                    label="直前の償還プール(CJPY)"
                    formik={formik}
                  />
                  <InputField
                    name="sweepReserve"
                    label="弁済プール(CJPY)"
                    formik={formik}
                  />
                  <InputField
                    name="prevSweepReserve"
                    label="直前の弁済プール(CJPY)"
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
