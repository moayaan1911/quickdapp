"use client";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton, useActiveAccount } from "thirdweb/react";

import { inAppWallet, createWallet } from "thirdweb/wallets";
import { 
  // Major Mainnets
  ethereum,
  polygon,
  bsc,
  avalanche,
  arbitrum,
  arbitrumNova,
  optimism,
  base,
  fantom,
  celo,
  moonbeam,
  gnosis,
  scroll,
  linea,
  zkSync,
  polygonZkEvm,
  blast,
  mantaPacific,
  mode,
  zora,
  degen,
  xai,
  treasure,
  cronos,
  palm,
  rari,
  // Testnets
  sepolia,
  polygonAmoy,
  polygonMumbai,
  bscTestnet,
  avalancheFuji,
  arbitrumSepolia,
  optimismSepolia,
  baseSepolia,
  fantomTestnet,
  celoAlfajoresTestnet,
  scrollSepoliaTestnet,
  lineaSepolia,
  zkSyncSepolia,
  polygonZkEvmTestnet,
  blastSepolia,
  mantaPacificTestnet,
  modeTestnet,
  zoraSepolia,
  xaiSepolia,
  rariTestnet,
  palmTestnet,
  gnosisChiadoTestnet,
  frameTestnet,
  fraxtalTestnet,
  berachainBepolia,
  hokumTestnet,
  metalL2Testnet,
  monadTestnet,
  somniaTestnet,
  soneiumMinato,
  tRexTestnet,
  treasureTopaz,
  zkCandySepolia,
  abstractTestnet,
  assetChainTestnet,
  astriaEvmDusknet,
  etherlink,
  etherlinkTestnet,
  coreMainnet,
  coreTestnet,
  godWoken,
  godWokenTestnetV1
} from "thirdweb/chains";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
});

// All supported chains - Comprehensive list from Thirdweb
const supportedChains = [
  // Major Mainnets
  ethereum,
  polygon,
  bsc,
  avalanche,
  arbitrum,
  arbitrumNova,
  optimism,
  base,
  fantom,
  celo,
  moonbeam,
  gnosis,
  scroll,
  linea,
  zkSync,
  polygonZkEvm,
  blast,
  mantaPacific,
  mode,
  zora,
  degen,
  xai,
  treasure,
  cronos,
  palm,
  rari,
  etherlink,
  coreMainnet,
  godWoken,
  // Testnets
  sepolia,
  polygonAmoy,
  polygonMumbai,
  bscTestnet,
  avalancheFuji,
  arbitrumSepolia,
  optimismSepolia,
  baseSepolia,
  fantomTestnet,
  celoAlfajoresTestnet,
  scrollSepoliaTestnet,
  lineaSepolia,
  zkSyncSepolia,
  polygonZkEvmTestnet,
  blastSepolia,
  mantaPacificTestnet,
  modeTestnet,
  zoraSepolia,
  xaiSepolia,
  rariTestnet,
  palmTestnet,
  gnosisChiadoTestnet,
  frameTestnet,
  fraxtalTestnet,
  berachainBepolia,
  hokumTestnet,
  metalL2Testnet,
  monadTestnet,
  somniaTestnet,
  soneiumMinato,
  tRexTestnet,
  treasureTopaz,
  zkCandySepolia,
  abstractTestnet,
  assetChainTestnet,
  astriaEvmDusknet,
  etherlinkTestnet,
  coreTestnet,
  godWokenTestnetV1
];

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "discord",
        "telegram",
        "farcaster",
        "email",
        "x",
        "passkey",
        "phone",
        "github",
        "twitch",
        "steam",
        "apple",
        "facebook",
        "guest",
        "line",
        "tiktok",
        "coinbase",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("com.tangem"),
];

export default function ConnectWallet() {
  const account = useActiveAccount();
  const isConnected = !!account;

  return (
    <ConnectButton
      accountAbstraction={{
        chain: ethereum,
        sponsorGas: true,
      }}
      chains={supportedChains}
      client={client}
      connectButton={{ label: "Connect to QuickDapp" }}
      connectModal={{
        showThirdwebBranding: false,
        size: "compact",
        title: "QuickDapp Sign In",
      }}
      theme={isConnected ? "light" : "dark"}
      wallets={wallets}
    />
  );
}
