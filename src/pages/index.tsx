import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@/components/layout";
import "@/i18n/configs";
import MyPledge from "@/components/pledge";
import YamatoStatistics from "@/components/statistics";
import YamatoFunctions from "@/components/functions";
import { Grid, GridItem } from "@chakra-ui/react";
import YamatoWorldLogEvents from "@/components/world";
import Infographics from "@/components/infographics";
import { Toaster } from "@/components/ui/toaster";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Yamato Protocol</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main>
        <Layout>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "3fr 1fr",
            }}
          >
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
            <Grid>
              <GridItem>
                <YamatoWorldLogEvents />
              </GridItem>
              <GridItem>
                <Infographics />
              </GridItem>
            </Grid>
          </Grid>
          <Toaster />
        </Layout>
      </main>
    </div>
  );
};

export default Home;
