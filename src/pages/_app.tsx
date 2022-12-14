import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  localhost,
  hardhat,
} from "wagmi/chains";
import { createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { ConnectKitProvider, getDefaultClient } from "connectkit";

import "../styles/globals.css";

const alchemyId = process.env.ALCHEMY_ID;

const chains = [polygon];

const client = createClient(
  getDefaultClient({
    appName: "LataSwap",
    alchemyId,
    chains,
  })
);

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="soft">
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
