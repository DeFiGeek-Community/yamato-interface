import {
  Box,
  Grid,
  GridItem,
  Stack,
  Input,
  Checkbox,
  NumberInput,
  NumberInputField,
  // NumberInputStepper,
  // NumberIncrementStepper,
  // NumberDecrementStepper,
  FormControl,
  FormLabel,
  // FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Infographics from '../components/Infographics';
import Web3Status from '../components/WalletConnectButton';
import SvgYamatoLogWithTitle from '../components/svgs/YamatoLogoWithTitle';

export default function Index() {
  return (
    <>
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
            <Infographics />
          </GridItem>
          <GridItem rowSpan={5} colSpan={1}>
            <Stack>
              <FormControl>
                <FormLabel>TCR</FormLabel>
                <NumberInput>
                  <NumberInputField />
                </NumberInput>
                <FormHelperText>TCR is ...</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>rateOfEthJpy</FormLabel>
                <NumberInput>
                  <NumberInputField />
                </NumberInput>
                <FormHelperText>rateOfEthJpy is ...</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>ethChangePercent</FormLabel>
                <NumberInput>
                  <NumberInputField />
                </NumberInput>
                <FormHelperText>ethChangePercent is ...</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>redemptionReserve</FormLabel>
                <NumberInput>
                  <NumberInputField />
                </NumberInput>
                <FormHelperText>redemptionReserve is ...</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>isIncreaseForRedemptionReserve</FormLabel>
                <Checkbox>on</Checkbox>
                <FormHelperText>
                  isIncreaseForRedemptionReserve is ...
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>sweepReserve</FormLabel>
                <NumberInput>
                  <NumberInputField />
                </NumberInput>
                <FormHelperText>sweepReserve is ...</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>isIncreaseForSweepReserve</FormLabel>
                <Checkbox>on</Checkbox>
                <FormHelperText>
                  isIncreaseForSweepReserve is ...
                </FormHelperText>
              </FormControl>
            </Stack>
          </GridItem>
          <GridItem rowSpan={1} colSpan={4}>
            <Footer />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
