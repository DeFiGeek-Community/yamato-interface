import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  VStack,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import Dashboad from '../components/Dashboad';

export default function Index() {
  return (
    <div>
      <Helmet title="Yamato Protocol" />

      <VStack spacing={8} align="stretch">
        <h1>Yamato Protocol</h1>
        <Dashboad />
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
      </VStack>
    </div>
  );
}
