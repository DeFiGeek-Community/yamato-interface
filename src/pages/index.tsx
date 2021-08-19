import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CategoryTitle } from '../components/CommonItem';
import Dashboad from '../components/Dashboad';
import Footer from '../components/Footer';
import Infographics from '../components/Infographics';
import Pledge from '../components/Pledge';
import Redemption from '../components/Redemption';
import Web3Status from '../components/WalletConnectButton';
import World from '../components/World';
import SvgYamatoLogWithTitle from '../components/svgs/YamatoLogoWithTitle';

export default function Index() {
  return (
    <>
      <Box p={4}>
        <Helmet title="Yamato Interface" />

        <Grid
          templateRows="repeat(16, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={1} colSpan={4}>
            <Link to="/">
              <SvgYamatoLogWithTitle width={255} height={25} />
            </Link>
          </GridItem>

          <GridItem rowSpan={1} colSpan={1}>
            <div
              style={{
                textAlign: 'right',
                width: '100%',
              }}
            >
              <Web3Status />
            </div>
          </GridItem>

          <GridItem rowSpan={4} colSpan={4}>
            <Dashboad />
          </GridItem>

          <GridItem rowSpan={8} colSpan={1}>
            <World />
          </GridItem>

          <GridItem rowSpan={9} colSpan={4}>
            <Pledge />

            <Box className="divider" mt={12} />

            <Redemption />
          </GridItem>

          <GridItem rowSpan={5} colSpan={1}>
            <Infographics />
          </GridItem>

          <GridItem rowSpan={2} colSpan={5}>
            <Footer />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
