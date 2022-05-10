//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract HealthControl is AccessControl {
  /**
    * @dev Implementación de Roles Básicos del Contrato
  */

  bytes32 public constant ROLE_ADMIN = keccak256("ROLE_ADMIN");
  bytes32 public constant ROLE_DOCTOR = keccak256("ROLE_DOCTOR");
  bytes32 public constant ROLE_USER = keccak256("ROLE_USER");

  constructor (address admin) {
    _setupRole(ROLE_ADMIN, admin);
    _setRoleAdmin(ROLE_DOCTOR, ROLE_ADMIN);
    _setRoleAdmin(ROLE_USER, ROLE_ADMIN);
  }

  struct doctorProfile {
    address doctor_wallet;
    string cid;
  }

  struct userProfile {
    address user_wallet;
    string cid;
  }

  /**
    * @dev Function to add organization role from admin. 
  */
  function addDoctor(address newOrganization) public virtual () {
      grantRole(ORGANIZATION_ROLE, newOrganization);
      _organizationRegister[newOrganization].isActive = true;
  }

  /**
    * @dev Function to add organization role from admin. 
  */
  function addUser(address newOrganization) public virtual () {
      grantRole(ORGANIZATION_ROLE, newOrganization);
      _organizationRegister[newOrganization].isActive = true;
  }


    
    /**
     * @dev Function to add producer role from admin.
     */
    function addFarmer(address newFarmer) public virtual whenNotPaused() {
        grantRole(PRODUCER_ROLE, newFarmer);
        _organizationRegister[msg.sender].members.push(newFarmer);
        emit farmerAdded(newFarmer, msg.sender);
    }


}