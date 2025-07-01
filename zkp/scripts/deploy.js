 const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("📡 Deploying contracts with account:", deployer.address);

  // === 1. Deploy Verifier ===
  const Verifier = await hre.ethers.deployContract("Verifier");
  await Verifier.waitForDeployment();
  console.log("✅ Verifier deployed at:", Verifier.target);

  // === 2. Deploy VoterRegistry ===
  const VoterRegistry = await hre.ethers.deployContract("VoterRegistry", [
    deployer.address,
  ]);
  await VoterRegistry.waitForDeployment();
  console.log("✅ VoterRegistry deployed at:", VoterRegistry.target);

  // === 3. Deploy ZkpVoting with Verifier & Registry addresses ===
  const ZkpVoting = await hre.ethers.deployContract("ZkpVoting", [
    Verifier.target,
    VoterRegistry.target,
  ]);
  await ZkpVoting.waitForDeployment();
  console.log("✅ ZkpVoting deployed at:", ZkpVoting.target);

  // === OPTIONAL: Save contract addresses to a JSON file ===
  const fs = require("fs");
  fs.writeFileSync(
    "deployment.json",
    JSON.stringify(
      {
        verifier: Verifier.target,
        voterRegistry: VoterRegistry.target,
        zkpVoting: ZkpVoting.target,
      },
      null,
      2
    )
  );
  console.log("📝 deployment.json file created.");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
