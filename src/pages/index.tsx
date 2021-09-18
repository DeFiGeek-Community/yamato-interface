import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import BackgroundImage from '../assets/images/background_main.png';
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
      <Helmet title="Yamato Interface" />

      <Box p={4} style={{ backgroundColor: '#FCFAF2' }}>
        <Grid
          templateRows="repeat(1, 1fr)"
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
        </Grid>
      </Box>

      <Box
        style={{
          padding: '20px',
          backgroundImage: `url(${BackgroundImage})`,
        }}
      >
        <Grid
          templateRows="repeat(10, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={3}>
            <Dashboad />
          </GridItem>

          <GridItem rowSpan={4} colSpan={1}>
            <World />
          </GridItem>

          <GridItem rowSpan={7} colSpan={3}>
            <Pledge />

            <Box className="divider" mt={'20px'} />

            <Redemption />
          </GridItem>

          <GridItem rowSpan={5} colSpan={1}>
            <Infographics />
          </GridItem>
        </Grid>
      </Box>

      <Box style={{ backgroundColor: '#FCFAF2' }}>
        <Footer />
      </Box>
    </>
  );
}
