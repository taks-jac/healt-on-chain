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

  event DoctorAdded(address indexed doctor, string message); 
  event UserAdded(address indexed user, string message); 

  constructor (address admin) {
    _setupRole(ROLE_ADMIN, admin);
    _setRoleAdmin(ROLE_DOCTOR, ROLE_ADMIN);
    _setRoleAdmin(ROLE_USER, ROLE_ADMIN);
  }

  /**
    * @dev Function to add organization role from admin. 
  */
  function addDoctor(address _newDoctor, bytes32  _doctorCidProfile) public virtual {
      grantRole(ROLE_DOCTOR, _newDoctor);
      _doctorRegister[_newDoctor] = _doctorCidProfile;
      emit DoctorAdded(_newDoctor, "Doctor added");
  }

  /**
    * @dev Function to add organization role from admin. 
  */
  function addUser(address _newUser, bytes32 _userCidProfile) public virtual {
      grantRole(ROLE_USER, _newUser);
      _userRegister[_newUser] = _userCidProfile;
      emit UserAdded(_newUser, "User added");
  }

  function viewUserProfile(address _user) public view returns (bytes32) {
    require(hasRole(ROLE_DOCTOR, _msgSender()) || _user==_msgSender(),"HealthControl: User is not allowed");
    require(hasRole(ROLE_USER, _user),"HealthStore: User is not register");
    
    return _userRegister[_user];
  }

  function viewDoctorProfile(address _doctor) public view returns (bytes32) {
    require(hasRole(ROLE_DOCTOR, _doctor),"HealthControl: Doctor is not register");
    
    return _doctorRegister[_doctor];
  }
  
}