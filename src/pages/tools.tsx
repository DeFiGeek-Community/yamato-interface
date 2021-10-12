import { Grid, GridItem } from '@chakra-ui/react';
import Layout from '../components/layout';
import InfographicsTool from '../components/tools/InfographicsTool';

export default function Tools() {
  return (
    <Layout title="Yamato Tools">
      <Grid
        templateRows="repeat(8, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={8}
      >
        <GridItem rowSpan={5} colSpan={2}>
          <InfographicsTool />
        </GridItem>
      </Grid>
    </Layout>
  );
}
