// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.28",
// };


// require("@nomicfoundation/hardhat-toolbox");

// module.exports = {
//   solidity: "0.8.24",
//   networks: {
//     baseSepolia: {
//       url: "https://sepolia.base.org",
//       accounts: [ "b4eb632a6704896fe7badd7ea357eec389ddae352a7572e9290efab39f59278c" ] // 🛑 Never commit this
//     }
//   }
// };


// require("@nomiclabs/hardhat-ethers");
// require("dotenv").config();

// module.exports = {
//   solidity: "0.8.20",
//   networks: {
//     baseSepolia: {
//       url: process.env.BASE_SEPOLIA_RPC_URL,
//       accounts: [process.env.PRIVATE_KEY],
//       chainId: 84532,
//     },
//   },
// };



 require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // make sure dotenv is loaded

module.exports = {
  solidity: "0.8.24",
  networks: {
    basesepolia: {
      url: `https://sepolia.base.org`, // official Base Sepolia RPC
      accounts: [process.env.PRIVATE_KEY], // ⚠️ define in .env file
    },
  },
};
