 require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const verifierAddress = process.env.VERIFIER_ADDRESS;

  if (!verifierAddress) {
    throw new Error("❌ VERIFIER_ADDRESS not set in .env");
  }

  const ZkpVoting = await ethers.getContractFactory("ZkpVoting");
  const zkVoting = await ZkpVoting.deploy(verifierAddress); // ← Deploy karo
  await zkVoting.waitForDeployment();                        // ← Wait karo

  console.log("✅ ZkpVoting deployed at:", await zkVoting.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
