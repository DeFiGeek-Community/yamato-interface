import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { ChakraProvider } from "@chakra-ui/react";
import { config as WagmiConfig } from "@/wagmi";
import { config as ChakraConfig } from "@/chakra";
import { ReloadContextProvider } from "@/providers/ReloadContextProvider";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider value={ChakraConfig}>
      <WagmiProvider config={WagmiConfig}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider
            theme={lightTheme({
              accentColor: "#5BAD92",
            })}
            showRecentTransactions={true}
          >
            <ReloadContextProvider>
              <Component {...pageProps} />
            </ReloadContextProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  );
}

export default MyApp;
