import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  ChakraProvider,
  defaultConfig,
  createSystem,
  defineConfig,
} from "@chakra-ui/react";
import { config } from "../wagmi";

const client = new QueryClient();

const chakraConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          100: { value: "#e6f2ff" },
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider value={createSystem(defaultConfig, chakraConfig)}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  );
}

export default MyApp;
