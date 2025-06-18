const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Verifier", function () {
  let verifier;

  beforeEach(async function () {
    const VerifierFactory = await ethers.getContractFactory("Verifier");
    verifier = await VerifierFactory.deploy(); // ✅ deploy the contract
    await verifier.waitForDeployment(); // ✅ NEW in ethers v6
  });

  it("Should return false for an invalid proof", async function () {
    const a = [0, 0];
    const b = [
      [0, 0],
      [0, 0],
    ];
    const c = [0, 0];
    const input = [0, 0, 0, 0];

    const result = await verifier.verifyProof(a, b, c, input);
    expect(result).to.equal(false);
  });
});
