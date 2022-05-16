const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("AgrosAccessControl", function () {
  it("1. Should add an organization", async function () {
    const [owner, minter, admin,org1,org2,user1,user2] = await ethers.getSigners(); 
    const AgroStructure = await ethers.getContractFactory("AgrosAccessControl");
    const roles = await AgroStructure.deploy(minter.address,admin.address);
    await roles.deployed();
    console.log("Agros Structure deployed", roles.address);   

    const role_org = ethers.utils.id("PROVEEDOR")   
    const organization_1 = await roles.connect(admin).addOrganization(org1.address,role_org);
    const info_org = await roles.connect(admin).infoOrganization(org1.address);  
    expect(info_org[0]).to.equal(role_org);
    console.log("Organization added")

    const role_user = ethers.utils.id("AGENTE")  
    const user_1 = await roles.connect(org1).addUser(user1.address,role_user);
    const info_user = await roles.connect(admin).infoUser(user1.address); 
    expect(info_user[0]).to.equal(role_user);
    console.log("User added")

  });
});
