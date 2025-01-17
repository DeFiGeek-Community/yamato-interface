import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import Dashboard from '../components/Dashboard';
import Infographics from '../components/Infographics';
import Pledge from '../components/Pledge';
import Redemption from '../components/Redemption';
import World from '../components/World';
import Layout from '../components/layout';

export default function Index() {
  const { account } = useWeb3React();

  return (
    <Layout>
      {!!account ? (
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap={8}
          style={{ maxWidth: '1280px', margin: 'auto' }}
        >
          <GridItem colSpan={3}>
            <Dashboard />

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
      ) : (
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(3, 1fr)',
          }}
          gap={8}
          style={{
            maxWidth: '960px',
            margin: 'auto',
          }}
        >
          <GridItem
            colSpan={{
              base: 1,
              md: 3,
            }}
          >
            <Box className="divider" mt={'20px'} />
            <Dashboard />
          </GridItem>

          <GridItem
            colSpan={{
              base: 1,
              md: 2,
            }}
          >
            <World />
          </GridItem>

          <GridItem
            colSpan={{
              base: 1,
              md: 1,
            }}
          >
            <Infographics />
          </GridItem>
        </Grid>
      )}
    </Layout>
  );
}
