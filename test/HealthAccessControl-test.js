const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("HealthControl", function () {
  it("1. Should add an organization", async function () {
    const [owner, admin,doctor,user1,user2] = await ethers.getSigners(); 
    const HealthStructure = await ethers.getContractFactory("HealthControl");
    const roles = await HealthStructure.deploy(admin.address);
    await roles.deployed();
    console.log("Health Structure deployed", roles.address);   

    const role_org = ethers.utils.id("ROLE_DOCTOR")   
    const doctor_cid = ethers.utils.id("QmZMbSwsdXGcgfc6xzm5e2UMeVNMq2pXfx75eNZcb9Nb8c")
    const doctor_1 = await roles.connect(admin).addDoctor(doctor.address,doctor_cid);
    const info_doctor = await roles.connect(admin).hasRole(role_org,doctor.address);
    expect(info_doctor).to.equal(true);
    console.log("Doctor added")

    const role_user = ethers.utils.id("ROLE_USER")  
    const user_cid = ethers.utils.id("QmP3qbWY2iNhvtjtijzdU4AgVW3pzrUbxPbxA9VMhc2nzr")
    const user_1 = await roles.connect(admin).addUser(user1.address,user_cid);
    const info_user = await roles.connect(admin).hasRole(role_user,user1.address);
    expect(info_user).to.equal(true);
    console.log("User added")

 
  });
});
