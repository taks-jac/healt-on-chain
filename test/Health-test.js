const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HealthControl", function () {
  it("1. Should add doctor and user roles", async function () {
    
    const [owner, admin,doctor,user1,user2] = await ethers.getSigners(); 
    const HealthStructure = await ethers.getContractFactory("HealthControl");
    const roles = await HealthStructure.deploy(admin.address);
    await roles.deployed();
    console.log("Health Structure deployed", roles.address);   

    const role_org = ethers.utils.id("ROLE_DOCTOR")  
    const doctor_cid = '0x6df1dff781c6d4b003ffc9288c7e7f0a8a75244ac271035db35249bd25a6de95'
    const doctor_1 = await roles.connect(admin).addDoctor(doctor.address, doctor_cid);
    const info_doctor = await roles.connect(admin).hasRole(role_org,doctor.address);
    expect(info_doctor).to.equal(true);
    console.log("Doctor added")

    const role_user = ethers.utils.id("ROLE_USER")  
    const user_cid = "0x6df1dff781c6d4b003ffc9288c7e7f0a8a75244ac271035db35249bd25a6de95"
    const user_1 = await roles.connect(admin).addUser(user1.address,user_cid);
    const info_user = await roles.connect(admin).hasRole(role_user,user1.address);
    expect(info_user).to.equal(true);
    console.log("User added") 
  });

  it("2. Should add and view a medical history", async function () {
    const [owner, admin,doctor,user1,user2] = await ethers.getSigners(); 
    const HealthStructure = await ethers.getContractFactory("HealthControl");
    const roles = await HealthStructure.deploy(admin.address);
    await roles.deployed();
    console.log("Health Structure deployed", roles.address);   

    const role_org = ethers.utils.id("ROLE_DOCTOR")  
    const doctor_cid = '0x6df1dff781c6d4b003ffc9288c7e7f0a8a75244ac271035db35249bd25a6de95'
    const doctor_1 = await roles.connect(admin).addDoctor(doctor.address, doctor_cid);
    const info_doctor = await roles.connect(admin).hasRole(role_org,doctor.address);
    expect(info_doctor).to.equal(true);
    console.log("Doctor added")

    const role_user = ethers.utils.id("ROLE_USER")  
    const user_cid = "0x6df1dff781c6d4b003ffc9288c7e7f0a8a75244ac271035db35249bd25a6de95"
    const user_1 = await roles.connect(admin).addUser(user1.address,user_cid);
    const info_user = await roles.connect(admin).hasRole(role_user,user1.address);
    expect(info_user).to.equal(true);
    console.log("User added")
    
    
    const HealtStorage = await ethers.getContractFactory("HealthStore");
    const store = await HealtStorage.deploy(roles.address,admin.address);
    await store.deployed();
    console.log("Health Structure deployed", store.address);   
    
    const approve= await store.connect(user1).approveUser(doctor.address)
    console.log("pass1")
    const history_cid = '0x6df1dff781c6d4b003ffc9288c7e7f0a8a75244ac271035db35249bd25a6de95'
    const historial = await store.connect(doctor).addHistorial(user1.address,history_cid)
    console.log("pass2")
    const view_history = await store.connect(doctor).viewHistorial(user1.address)
    console.log("cid",view_history)  
 
  });
});
