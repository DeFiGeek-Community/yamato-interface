import { Grid, GridItem } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import InfographicsTool from '../components/InfographicsTool';
import Layout from '../components/Layout';

export default function Tools() {
  return (
    <Layout>
      <Helmet title="Yamato Tools" />
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
