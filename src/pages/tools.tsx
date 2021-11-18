import { Grid, GridItem } from '@chakra-ui/react';
import { useMediaQueryContext } from '../MediaQueryProvider';
import Layout from '../components/layout';
import InfographicsTool from '../components/tools/InfographicsTool';

export default function Tools() {
  const { isMobileSite } = useMediaQueryContext();
  if (isMobileSite) {
    return <ToolsMobile />;
  } else {
    return <ToolsPC />;
  }
}

export function ToolsMobile() {
  return (
    <Layout title="Yamato Tools">
      <Grid>
        <GridItem>
          <InfographicsTool />
        </GridItem>
      </Grid>
    </Layout>
  );
}

export function ToolsPC() {
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
