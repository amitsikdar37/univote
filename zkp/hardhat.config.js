// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.28",
// };


require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.24",
  networks: {
    baseSepolia: {
      url: "https://sepolia.base.org",
      accounts: [ "b4eb632a6704896fe7badd7ea357eec389ddae352a7572e9290efab39f59278c" ] // 🛑 Never commit this
    }
  }
};




// require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config(); // .env फ़ाइल से ENV लोड करने के लिए

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.24",
//   networks: {
//     sepolia: {
//       url: process.env.BASE_SEPOLIA_URL || "https://sepolia.base.org", // या Alchemy/Infura URL
//       accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
//     },
//   },
// };