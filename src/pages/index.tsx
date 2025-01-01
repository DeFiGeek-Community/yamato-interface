import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "@/components/layout";
import "@/i18n/configs";
import MyPledge from "@/components/pledge";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Yamato Protocol</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <MyPledge />

          <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>pages/index.tsx</code>
          </p>

          <div className={styles.grid}>
            <a className={styles.card} href="https://rainbowkit.com">
              <h2>RainbowKit Documentation &rarr;</h2>
              <p>Learn how to customize your wallet connection flow.</p>
            </a>

            <a className={styles.card} href="https://wagmi.sh">
              <h2>wagmi Documentation &rarr;</h2>
              <p>Learn how to interact with Ethereum.</p>
            </a>

            <a
              className={styles.card}
              href="https://github.com/rainbow-me/rainbowkit/tree/main/examples"
            >
              <h2>RainbowKit Examples &rarr;</h2>
              <p>Discover boilerplate example RainbowKit projects.</p>
            </a>

            <a className={styles.card} href="https://nextjs.org/docs">
              <h2>Next.js Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a
              className={styles.card}
              href="https://github.com/vercel/next.js/tree/canary/examples"
            >
              <h2>Next.js Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              className={styles.card}
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            >
              <h2>Deploy &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default Home;
