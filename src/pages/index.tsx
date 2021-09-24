import { Box, Grid, GridItem } from '@chakra-ui/react';
import Dashboad from '../components/Dashboad';
import Infographics from '../components/Infographics';
import Layout from '../components/Layout';
import Pledge from '../components/Pledge';
import Redemption from '../components/Redemption';
import World from '../components/World';

export default function Index() {
  return (
    <Layout title="Yamato Interface">
      <Grid
        templateRows="repeat(8, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={8}
        style={{ maxWidth: '1280px', margin: 'auto' }}
      >
        <GridItem rowSpan={2} colSpan={3}>
          <Dashboad />
        </GridItem>

        <GridItem rowSpan={3} colSpan={1}>
          <World />
        </GridItem>

        <GridItem rowSpan={6} colSpan={3} mt={-14}>
          <Pledge />

          <Box className="divider" mt={'20px'} />

          <Redemption />
        </GridItem>

        <GridItem rowSpan={5} colSpan={1}>
          <Infographics />
        </GridItem>
      </Grid>
    </Layout>
  );
}
