const { ethers} = require('hardhat');
require("dotenv").config();

async function main() {  
  const ADMIN_ADDRESS = process.env.AGROS_ADMIN_ADDRESS

  const HealthStructure = await ethers.getContractFactory("HealthControl");
  const roles = await HealthStructure.deploy(ADMIN_ADDRESS);
  await roles.deployed();
  console.log("Health Structure deployed", roles.address);

  const HealtStorage = await ethers.getContractFactory("HealthStore");
  console.log("Deploying Storage V1");
  const store = await HealtStorage.deploy(roles.address,ADMIN_ADDRESS);
  await store.deployed();
  console.log("Health store", store.address);

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
