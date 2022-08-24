import { NetworkName } from "./hardhat.config";

type DeployConfigKey = "AmpleRouter" | "MaxZapReverseRatio" | "WETH";

const deployConfig: Record<DeployConfigKey, Record<NetworkName, string>> = {
  AmpleRouter: {
    polygonMainnet: ``,
    polygonTestnet: ``,
  },
  MaxZapReverseRatio: {
    polygonMainnet: `50`, // 0.5%
    polygonTestnet: `50`, // 0.5%
  },
  WETH: {
    polygonMainnet: `0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270`,
    polygonTestnet: `0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889`,
  },
};

export default deployConfig;
