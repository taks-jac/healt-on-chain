const { ethers, upgrades } = require('hardhat');
require("dotenv").config();

async function main() {  
  const ADMIN_ADDRESS = process.env.AGROS_ADMIN_ADDRESS
  const MINTER_ADDRESS = process.env.AGROS_MINTER_ADDRESS 

  const AgroStructure = await ethers.getContractFactory("AgrosAccessControl");
  const roles = await AgroStructure.deploy(MINTER_ADDRESS,ADMIN_ADDRESS);
  await roles.deployed();
  console.log("Agros Structure deployed", roles.address);

  const AgrosToken = await ethers.getContractFactory("AgrosTokenExchangueV1");
  console.log("Deploying Token V1");
  const token = await upgrades.deployProxy(AgrosToken,[roles.address,ADMIN_ADDRESS],{ initializer: 'initialize' });
  await token.deployed();
  console.log("Token V1 deployed:", token.address);

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
