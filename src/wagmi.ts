import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";
import { http } from "wagmi";

export const config = getDefaultConfig({
  appName: "Yamato Protocol Interface",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  transports: {
    [mainnet.id]: http("https://rpc.ankr.com/eth"),
    // [sepolia.id]: http("https://sepolia.drpc.org"),
    // [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
