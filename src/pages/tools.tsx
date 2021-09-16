import {
  Box,
  Grid,
  GridItem,
  Stack,
  NumberInput,
  NumberInputField,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Infographics from '../components/Infographics';
import Web3Status from '../components/WalletConnectButton';
import SvgYamatoLogWithTitle from '../components/svgs/YamatoLogoWithTitle';

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
        formik.setFieldValue(name, parseFloat(e.target.value));
      };

  return (
    <FormControl>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <NumberInput>
        <NumberInputField id={name} onChange={onChangeHandler} />
      </NumberInput>
    </FormControl>
  );
}

export default function Index() {
  return (
    <Formik initialValues={{}} onSubmit={() => undefined}>
      {(formik) => (
        <Form>
          <Box p={4}>
            <Helmet title="Yamato Interface" />

            <Grid
              templateRows="repeat(16, 1fr)"
              templateColumns="repeat(4, 1fr)"
              gap={4}
            >
              <GridItem rowSpan={1} colSpan={2}>
                <Link to="/">
                  <SvgYamatoLogWithTitle width={255} height={25} />
                </Link>
                <Link to="/tools/">ツール</Link>
              </GridItem>

              <GridItem rowSpan={1} colSpan={2}>
                <div
                  style={{
                    textAlign: 'right',
                    width: '100%',
                  }}
                >
                  <Web3Status />
                </div>
              </GridItem>

              <GridItem rowSpan={5} colSpan={1}>
                <Infographics {...formik.values} />
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
                    label="負債総額(CJPY)"
                    formik={formik}
                  />
                  <InputField
                    name="rateOfCjpyJpy"
                    label="CJPY/JPY 交換レート"
                    formik={formik}
                    onChange={(e: any) => {
                      formik.setFieldValue(
                        'rateOfCjpyJpy',
                        '' == e.target.value
                          ? undefined
                          : { manual: parseFloat(e.target.value) }
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
                    label="償還準備額"
                    formik={formik}
                  />
                  <InputField
                    name="prevRedemptionReserve"
                    label="直前の償還準備額"
                    formik={formik}
                  />
                  <InputField
                    name="sweepReserve"
                    label="弁済候補総額"
                    formik={formik}
                  />
                  <InputField
                    name="prevSweepReserve"
                    label="直前の弁済候補総額"
                    formik={formik}
                  />
                </Stack>
              </GridItem>

              <GridItem rowSpan={1} colSpan={4}>
                <Footer />
              </GridItem>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
