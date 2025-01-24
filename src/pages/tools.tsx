import { Grid, GridItem } from '@chakra-ui/react';
import Layout from '../components/layout';
import InfographicsTool from '../components/tools/InfographicsTool';

export default function Tools() {
  return (
    <Layout title="Yamato Tools">
      <Grid
        templateRows={{ base: 'repeat(8, 1fr)', lg: 'repeat(8, 1fr)' }}
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={8}
      >
        <GridItem rowSpan={5} colSpan={{ base: 1, lg: 2 }}              maxWidth="500px" // ここでmaxWidthを設定
        >
          <InfographicsTool />
        </GridItem>
      </Grid>
    </Layout>
  );
}