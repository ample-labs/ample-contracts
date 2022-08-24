import { ethers, network, run } from "hardhat";
import deployConfig from "../deployConfig";
import { NetworkName } from "../hardhat.config";

const main = async () => {
  // Compile contracts
  await run(`compile`);
  console.log(`Compiled contracts.`);

  const networkName = network.name as NetworkName;

  // Sanity checks
  if (networkName.endsWith(`Mainnet`)) {
    if (!process.env.KEY_MAINNET) {
      throw new Error(
        `Missing private key, refer to README 'Deployment' section`
      );
    }
  } else if (networkName.endsWith(`Testnet`)) {
    if (!process.env.KEY_TESTNET) {
      throw new Error(
        `Missing private key, refer to README 'Deployment' section`
      );
    }
  }

  if (
    !deployConfig.AmpleRouter[networkName] ||
    deployConfig.AmpleRouter[networkName] === ethers.constants.AddressZero
  ) {
    throw new Error(
      `Missing router address, refer to README 'Deployment' section`
    );
  }

  if (
    !deployConfig.WETH[networkName] ||
    deployConfig.WETH[networkName] === ethers.constants.AddressZero
  ) {
    throw new Error(
      `Missing WETH address, refer to README 'Deployment' section`
    );
  }

  console.log(`Deploying to network:`, networkName);

  // Deploy AmpleZapV1
  console.log(`Deploying AmpleZap V1..`);

  const AmpleZapV1 = await ethers.getContractFactory(`AmpleZapV1`);

  const ampleZap = await AmpleZapV1.deploy(
    deployConfig.WETH[networkName],
    deployConfig.AmpleRouter[networkName],
    deployConfig.MaxZapReverseRatio[networkName]
  );

  await ampleZap.deployed();

  console.log(`AmpleZap V1 deployed to:`, ampleZap.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
