"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, WagmiConfig, createConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
  goerli,
} from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { publicProvider } from "wagmi/providers/public";
import { ReactNode } from "react";

import { infuraProvider } from "wagmi/providers/infura";
import {
  NETWORKS,
  INFURA_KEY,
  SITE_NAME,
  PROJECT_ID,
} from "../configuration/Config";
import React from "react";

interface Props {
  children: ReactNode;
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  NETWORKS,
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: "https://polygon-mumbai-bor.publicnode.com",
      }),
    }),
  ]
  // [infuraProvider({ apiKey: INFURA_KEY })]
);
const { wallets } = getDefaultWallets({
  appName: SITE_NAME,
  projectId: PROJECT_ID,
  chains,
});
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      // argentWallet({ projectId: PROJECT_ID, chains }),
      trustWallet({ projectId: PROJECT_ID, chains }),
      ledgerWallet({ projectId: PROJECT_ID, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
export function Web3Provider(props: Props) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider modalSize="compact" coolMode chains={chains}>
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
