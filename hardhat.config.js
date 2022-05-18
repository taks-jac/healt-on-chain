require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy-ethers");
require("hardhat-deploy");
require("dotenv").config();

// MUMBAI NETWORK DATA
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const MUMBAI_URL = process.env.MUMBAI_URL;

// RINKEBY NETWORK DATA
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_KEY_RINKEBY = process.env.PRIVATE_KEY_RINKEBY 

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
      hardhat: {
        chainId: 31337  
      },
      ganache: {
        url: "http://127.0.0.1:8545",
      },
      mumbai: {
        url: MUMBAI_URL,
        accounts: [PRIVATE_KEY],
        chainId: 80001,
        blockConfirmations: 2
      },
      rinkeby: {
        url: RINKEBY_RPC_URL,
        accounts: [PRIVATE_KEY_RINKEBY],
        chainId: 4,
        blockConfirmations: 6,
      }
  },
  solidity: {
      compilers: [
          {
              version: "0.8.4",
          },
          {
              version: "0.6.6",
          },
      ],
  },
  namedAccounts: {
      deployer: {
          default: 0, // here this will by default take the first account as deployer
          1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      },
  }
}