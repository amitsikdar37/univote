// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Groth16Verifier.sol";

// Wrapper to make Groth16Verifier deployable and usable
contract Verifier is Groth16Verifier {}
