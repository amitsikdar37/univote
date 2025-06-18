const { ethers } = require("hardhat");

async function main() {
  console.log("📦 Deploying Verifier...");

  // Get the contract factory
  const VerifierFactory = await ethers.getContractFactory("Verifier");

  // Deploy the contract
  const verifier = await VerifierFactory.deploy();

  // Wait for deployment to finish (Ethers v6)
  await verifier.waitForDeployment();

  // Log deployed contract address
  console.log("✅ Verifier deployed to:", await verifier.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
