import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import BackgroundImage from '../assets/images/background_main.png';
import Footer from '../components/Footer';
import Web3Status from '../components/WalletConnectButton';
import SvgYamatoLogWithTitle from '../components/svgs/YamatoLogoWithTitle';

export default function Layout({ children }: { children: React.ReactNode }) {
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
              <SvgYamatoLogWithTitle width={422} height={50} />
            </Link>
          </GridItem>

          <GridItem
            rowSpan={1}
            colSpan={2}
            style={{
              textAlign: 'right',
            }}
          >
            <Web3Status />
            <Link
              to="/tools/"
              style={{
                fontSize: '1.6rem',
                fontWeight: 'bold',
                color: '#818181',
                verticalAlign: 'middle',
              }}
            >
              ツール
            </Link>
          </GridItem>
        </Grid>
      </Box>

      <Box
        style={{
          padding: '20px',
          backgroundImage: `url(${BackgroundImage})`,
        }}
      >
        {children}
      </Box>

      <Box style={{ backgroundColor: '#FCFAF2' }}>
        <Footer />
      </Box>
    </>
  );
}
