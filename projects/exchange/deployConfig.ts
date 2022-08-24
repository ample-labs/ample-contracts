import { NetworkName } from "./hardhat.config";

const deployConfig: { [key: string]: Record<NetworkName, string> } = {
  AmpleRouter: {
    polygonMainnet: ``,
    polygonTestnet: ``,
  },
  MaxZapReverseRatio: {
    polygonMainnet: `50`, // 0.5%
    polygonTestnet: `50`, // 0.5%
  },
  WETH: {
    polygonMainnet: ``,
    polygonTestnet: ``,
  },
};

export default deployConfig;
