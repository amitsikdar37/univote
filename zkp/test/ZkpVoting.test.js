const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ZkpVoting", function () {
  let verifier;
  let zkpVoting;

  beforeEach(async function () {
    const Verifier = await ethers.getContractFactory("Verifier");
    verifier = await Verifier.deploy();
    await verifier.waitForDeployment(); // <-- This is important!

    const ZkpVoting = await ethers.getContractFactory("ZkpVoting");
    zkpVoting = await ZkpVoting.deploy(await verifier.getAddress()); // not verifier.address!
    await zkpVoting.waitForDeployment();
  });

  it("should deploy ZkpVoting with Verifier address", async function () {
    const admin = await zkpVoting.getNextElectionCounter();
    expect(admin).to.equal(0);
  });
});
