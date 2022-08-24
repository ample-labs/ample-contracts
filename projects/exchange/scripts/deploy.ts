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

  console.log(`Deploying to network:`, networkName);

  const [deployer] = await ethers.getSigners();

  // Deploy AmpleFactory
  console.log(`Deploying AmpleFactory..`);

  const AmpleFactory = await ethers.getContractFactory(`AmpleFactory`);
  const ampleFactory = await AmpleFactory.deploy(deployer.address);
  await ampleFactory.deployed();

  console.log(`AmpleFactory deployed to:`, ampleFactory.address);

  // Deploy AmpleRouter
  console.log(`Deploying AmpleRouter..`);

  const AmpleRouter = await ethers.getContractFactory(`AmpleRouter`);
  const ampleRouter = await AmpleRouter.deploy(
    ampleFactory.address,
    deployConfig.WETH[networkName]
  );
  await ampleRouter.deployed();

  console.log(`AmpleRouter deployed to:`, ampleRouter.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
