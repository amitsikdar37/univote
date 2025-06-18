const hre = require("hardhat");

async function main() {
  // ✅ Paste your deployed Verifier contract address here
  const verifierAddress = "0x806FC12C3Aa46690a44A182C3D677c6114F31eBb";

  console.log("Deploying ZkpVoting with Verifier address:", verifierAddress);

  const ZkpVoting = await hre.ethers.getContractFactory("ZkpVoting");
  const zkVoting = await ZkpVoting.deploy(verifierAddress);
  await zkVoting.waitForDeployment();

  console.log(`✅ ZkpVoting deployed at: ${zkVoting.target}`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
