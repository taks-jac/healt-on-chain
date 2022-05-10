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

  mapping(address => bytes32) private _doctorRegister;
  mapping(address => bytes32) private _userRegister;

  event DoctorAdded(address indexed doctor, bytes32 indexed cid, string message); 
  event UserAdded(address indexed user, bytes32 indexed cid, string message); 

  constructor (address admin) {
    _setupRole(ROLE_ADMIN, admin);
    _setRoleAdmin(ROLE_DOCTOR, ROLE_ADMIN);
    _setRoleAdmin(ROLE_USER, ROLE_ADMIN);
  }

  /**
    * @dev Function to add organization role from admin. 
  */
  function addDoctor(address newDoctor, bytes32 cid) public virtual {
      grantRole(ROLE_DOCTOR, newDoctor);
      _doctorRegister[newDoctor] = cid;
      emit DoctorAdded(newDoctor, cid, "Doctor added");
  }

  /**
    * @dev Function to add organization role from admin. 
  */
  function addUser(address newUser, bytes32 cid) public virtual {
      grantRole(ROLE_USER, newUser);
      _userRegister[newUser] = cid;
      emit UserAdded(newUser, cid, "User added");
  }
  
}