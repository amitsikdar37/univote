const hre = require("hardhat");

async function main() {
  // Yahan apne deploy kiye gaye ZkpVoting contract ka address daalein
  const zkpVotingAddress = "0x3922877F1697B0449A51B682620F26bFB325Fa14";

  // Ek sample commitment jo aap register karna chahte hain.
  // Yeh wahi commitment hona chahiye jise aapka frontend voting ke waqt use karega.
  const sampleCommitment = "0x0000000000000000000000000000000000000000000000000000000000000001";

  console.log(`ZkpVoting contract se interact kiya ja raha hai at: ${zkpVotingAddress}`);
  const zkpVoting = await hre.ethers.getContractAt("ZkpVoting", zkpVotingAddress);

  console.log(`Commitment register kiya ja raha hai: ${sampleCommitment}`);
  const tx = await zkpVoting.addCommitment(sampleCommitment);
  await tx.wait();

  console.log(`✅ Voter commitment safaltapoorvak register ho gaya!`);
  console.log(`Transaction Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});