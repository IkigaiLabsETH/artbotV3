// Script to deploy the IKIGAI Protocol contracts
const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying IKIGAI Protocol contracts...");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy IKIGAI Token
  console.log("\nDeploying IKIGAI Token...");
  const IKIGAIToken = await ethers.getContractFactory("IKIGAIToken");
  const ikigaiToken = await IKIGAIToken.deploy(deployer.address);
  await ikigaiToken.deployed();
  console.log("IKIGAI Token deployed to:", ikigaiToken.address);

  // Deploy Genesis NFT
  console.log("\nDeploying Genesis NFT...");
  const GenesisNFT = await ethers.getContractFactory("GenesisNFT");
  const genesisNFT = await GenesisNFT.deploy(
    deployer.address,
    "IKIGAI Genesis",
    "IKIGAI-GEN",
    deployer.address, // royalty recipient
    500, // 5% royalties
    deployer.address // primary sale recipient
  );
  await genesisNFT.deployed();
  console.log("Genesis NFT deployed to:", genesisNFT.address);

  // Set IKIGAI token in Genesis NFT
  console.log("\nSetting IKIGAI token in Genesis NFT...");
  await genesisNFT.setIkigaiToken(ikigaiToken.address);
  console.log("IKIGAI token set in Genesis NFT");

  // Set tokens per NFT (40% of supply / number of NFTs)
  const tokensPerNFT = ethers.utils.parseEther("400000000").div(10000); // 40% of 1B tokens / 10,000 NFTs
  await genesisNFT.setTokensPerNFT(tokensPerNFT);
  console.log("Tokens per NFT set to:", ethers.utils.formatEther(tokensPerNFT));

  // Deploy Token Staking
  console.log("\nDeploying Token Staking...");
  const IKIGAIStaking = await ethers.getContractFactory("IKIGAIStaking");
  const ikigaiStaking = await IKIGAIStaking.deploy(
    deployer.address,
    ikigaiToken.address, // staking token
    ikigaiToken.address, // reward token
    ethers.constants.AddressZero // native token wrapper (not used)
  );
  await ikigaiStaking.deployed();
  console.log("Token Staking deployed to:", ikigaiStaking.address);

  // Deploy NFT Staking
  console.log("\nDeploying NFT Staking...");
  const NFTStaking = await ethers.getContractFactory("NFTStaking");
  const nftStaking = await NFTStaking.deploy(
    deployer.address,
    genesisNFT.address, // NFT collection
    ikigaiToken.address, // reward token
    ethers.constants.AddressZero // native token wrapper (not used)
  );
  await nftStaking.deployed();
  console.log("NFT Staking deployed to:", nftStaking.address);

  // Deploy IKIGAI Bundle
  console.log("\nDeploying IKIGAI Bundle...");
  const IKIGAIBundle = await ethers.getContractFactory("IKIGAIBundle");
  const ikigaiBundle = await IKIGAIBundle.deploy(
    deployer.address,
    "IKIGAI Bundle",
    "IKIGAI-BUNDLE",
    deployer.address, // royalty recipient
    250, // 2.5% royalties
    deployer.address // fee recipient
  );
  await ikigaiBundle.deployed();
  console.log("IKIGAI Bundle deployed to:", ikigaiBundle.address);

  // Deploy IKIGAI Split for Trading Fees
  console.log("\nDeploying IKIGAI Split for Trading Fees...");
  const IKIGAISplit = await ethers.getContractFactory("IKIGAISplit");
  
  // Trading fee split (4.3% total)
  // 2.0% Protocol Owned Liquidity
  // 1.3% Staking Rewards
  // 1.0% Treasury Operations
  const tradingFeeSplit = await IKIGAISplit.deploy(
    deployer.address,
    [
      deployer.address, // Protocol Owned Liquidity (replace with actual address)
      ikigaiStaking.address, // Staking Rewards
      deployer.address // Treasury Operations (replace with actual address)
    ],
    [
      2000, // 2.0% -> 46.5% of the 4.3%
      1300, // 1.3% -> 30.2% of the 4.3%
      1000  // 1.0% -> 23.3% of the 4.3%
    ]
  );
  await tradingFeeSplit.deployed();
  console.log("IKIGAI Trading Fee Split deployed to:", tradingFeeSplit.address);

  // Grant minter role to staking contracts
  console.log("\nGranting minter role to staking contracts...");
  const MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"));
  await ikigaiToken.grantRole(MINTER_ROLE, ikigaiStaking.address);
  await ikigaiToken.grantRole(MINTER_ROLE, nftStaking.address);
  await ikigaiToken.grantRole(MINTER_ROLE, genesisNFT.address);
  console.log("Minter role granted to staking contracts");

  // Summary
  console.log("\n=== IKIGAI Protocol Deployment Summary ===");
  console.log("IKIGAI Token:", ikigaiToken.address);
  console.log("Genesis NFT:", genesisNFT.address);
  console.log("Token Staking:", ikigaiStaking.address);
  console.log("NFT Staking:", nftStaking.address);
  console.log("IKIGAI Bundle:", ikigaiBundle.address);
  console.log("Trading Fee Split:", tradingFeeSplit.address);
  console.log("==========================================");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 