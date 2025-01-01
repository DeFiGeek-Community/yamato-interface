import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@/components/layout";
import "@/i18n/configs";
import MyPledge from "@/components/pledge";
import YamatoStatistics from "@/components/dashboard";
import YamatoFunctions from "@/components/functions";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Yamato Protocol</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main>
        <Layout>
          <YamatoStatistics />
          <MyPledge />
          <YamatoFunctions />
        </Layout>
      </main>
    </div>
  );
};

export default Home;
