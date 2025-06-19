const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Groth16Verifier", function () {
  let Groth16Verifier, verifier;

  before(async () => {
    Groth16Verifier = await ethers.getContractFactory("Groth16Verifier");
    verifier = await Groth16Verifier.deploy();
    await verifier.waitForDeployment();
  });

  it("Should reject invalid proof", async function () {
    const a = [0, 0];
    const b = [
      [0, 0],
      [0, 0]
    ];
    const c = [0, 0];
    const input = [0, 0, 0, 0];

    const result = await verifier.verifyProof(a, b, c, input);
    expect(result).to.be.false;
  });

  // ✅ OPTIONAL: Add a valid proof test here (if you have `proof.json` and `public.json`)
});
