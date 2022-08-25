import type { HardhatUserConfig, NetworkUserConfig } from "hardhat/types";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-truffle5";
import "hardhat-contract-sizer";
import "solidity-coverage";
import "dotenv/config";

export type NetworkName = "polygonTestnet" | "polygonMainnet";

const networks: Record<NetworkName, NetworkUserConfig> = {
  polygonTestnet: {
    url: `https://rpc-mumbai.maticvigil.com/`,
    chainId: 80001,
    accounts: [process.env.KEY_TESTNET!],
  },
  polygonMainnet: {
    url: `https://polygon-rpc.com/`,
    chainId: 137,
    accounts: [process.env.KEY_MAINNET!],
  },
};

const config: HardhatUserConfig = {
  defaultNetwork: `hardhat`,
  networks: {
    hardhat: {},
    ...networks,
  },
  solidity: {
    compilers: [
      {
        version: `0.8.4`,
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
      {
        version: `0.6.6`,
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
      {
        version: `0.5.16`,
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
      {
        version: `0.4.18`,
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
    ],
  },
  paths: {
    sources: `./contracts`,
    tests: `./test`,
    cache: `./cache`,
    artifacts: `./artifacts`,
  },
};

export default config;
