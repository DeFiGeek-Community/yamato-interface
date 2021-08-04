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
import Dashboad from '../components/Dashboad';
import Footer from '../components/Footer';
import Infographics from '../components/Infographics';
import World from '../components/World';
import SvgYamatoLogWithTitle from '../components/svgs/YamatoLogoWithTitle';
import Web3Status from '../components/wallet-connect-button';

export default function Index() {
  return (
    <>
      <Box p={4}>
        <Helmet title="Yamato Interface" />

        <Grid
          templateRows="repeat(15, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={1} colSpan={4}>
            <Link to="/">
              {/* <img src={YamatoLogo} /> */}
              <SvgYamatoLogWithTitle />
            </Link>
          </GridItem>

          <GridItem rowSpan={1} colSpan={1}>
            <div
              style={{
                textAlign: 'right',
                width: '100%',
                padding: '16px 16px',
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

          <GridItem rowSpan={8} colSpan={4}>
            <Accordion allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      My Pledge
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>Under construction</AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      償還
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>Under construction</AccordionPanel>
              </AccordionItem>
            </Accordion>
          </GridItem>

          <GridItem rowSpan={4} colSpan={1}>
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
