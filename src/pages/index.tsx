import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@/components/layout";
import "@/i18n/configs";
import MyPledge from "@/components/pledge";
import YamatoStatistics from "@/components/dashboard";
import YamatoFunctions from "@/components/functions";
import { Grid, GridItem } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Yamato Protocol</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main>
        <Layout>
          <Grid>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <YamatoStatistics />
            </GridItem>
            <GridItem>
              <MyPledge />
            </GridItem>
            <GridItem>
              <YamatoFunctions />
            </GridItem>
          </Grid>
        </Layout>
      </main>
    </div>
  );
};

export default Home;
