 const hre = require("hardhat");

async function main() {
  console.log("Deployment script shuru ho rahi hai...");

  // =================================================================
  // Step 1: Verifier.sol contract ko deploy karna
  // =================================================================
  console.log("Verifier contract ko deploy kiya ja raha hai...");
  
  // hre.ethers.deployContract ek helper function hai jo deployment ko aasan banata hai.
  const verifier = await hre.ethers.deployContract("Verifier");

  // Naya tareeka: .waitForDeployment() ka istemaal karna
  // Yeh transaction ke mine hone ka intezaar karta hai.
  await verifier.waitForDeployment();

  // Contract ka address prapt karne ke liye .target ka istemaal karte hain
  console.log(`✅ Verifier contract is deployed to: ${verifier.target}`);

  // =================================================================
  // Step 2: ZkpVoting.sol contract ko deploy karna
  // =================================================================
  console.log("\nZkpVoting contract ko deploy kiya ja raha hai...");

  // Constructor arguments ko ek array mein pass karte hain.
  const zkpVoting = await hre.ethers.deployContract("ZkpVoting", [verifier.target]);

  // Deployment poora hone ka intezaar karna
  await zkpVoting.waitForDeployment();

  console.log(`✅ ZkpVoting contract is deployed to: ${zkpVoting.target}`);
  console.log("\nDeployment poora hua!");
}

// Main function ko call karna aur errors ko handle karna
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});