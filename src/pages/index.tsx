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
        templateColumns="repeat(4, 1fr)"
        gap={8}
        style={{ maxWidth: '1280px', margin: 'auto' }}
      >
        <GridItem colSpan={3}>
          <Dashboad />

          <Box className="divider" mt={'20px'} />

          <Pledge />

          <Box className="divider" mt={'20px'} />

          <Redemption />
        </GridItem>

        <GridItem colSpan={1}>
          <World />

          <Box className="divider" mt={'20px'} />

          <Infographics />
        </GridItem>
      </Grid>
    </Layout>
  );
}
