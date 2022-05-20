//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "contracts/HealthControl.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract HealthStore is Context {

  address private admin;
  HealthControl private health_access;
  bytes32 public constant ROLE_ADMIN = keccak256("ROLE_ADMIN");
  bytes32 public constant ROLE_DOCTOR = keccak256("ROLE_DOCTOR");
  bytes32 public constant ROLE_USER = keccak256("ROLE_USER");

  mapping(address => mapping(address => bool)) private _allowance;
  event UserApprove (address indexed user, address indexed doctor, bool status);
  event UserDisabled (address indexed user, bool status);

  struct UserData {
    address user;
    bool isActive;
    string cid;
  }

  mapping(address => UserData) private _userRegister;

  constructor(HealthControl _control_address ,address _admin) {
    admin = _admin;
    health_access = _control_address;
  }

  /**
   * @dev Updated user CID by adding new data.
   */
  function addHistorial(address _user, string memory _userCidData) public {
    require(health_access.hasRole(ROLE_DOCTOR, _msgSender()),"HealthStore: User is not a doctor");
    require(health_access.hasRole(ROLE_USER, _user),"HealthStore: User is not register");
    require(allowance(_user,_msgSender()),"HealthStore: Doctor does not allowed");
  
    _userRegister[_user].cid = _userCidData;
  }

  /**
   * @dev View user CID.
   */
  function viewHistorial(address _user) public view returns (string memory) {
    require(health_access.hasRole(ROLE_DOCTOR, _msgSender()),"HealthStore: User is not a doctor");
    require(health_access.hasRole(ROLE_USER, _user),"HealthStore: User is not register");
    require(allowance(_user,_msgSender()),"HealthStore: Doctor does not allowed");
    
    return _userRegister[_user].cid;
  }

  /**
   * @dev Approve doctor to access user data.   
   */
  function approveUser(address doctor) public returns (bool) {
    address user = _msgSender();
    _approveDataUser(user, doctor, true);
    return true;
  }

  /**
   * @dev Disable user.
   */
  function disableUser(address _user) public {
    if (health_access.hasRole(ROLE_ADMIN, _msgSender())) {
      revert("HealthStore: User is not admin");
    }  
    _userRegister[_user].isActive = false;
    emit UserDisabled(_user, false);
  }
  /**
   * @dev View allowance of doctor to access user data.   
   */
  function allowance(address _user, address doctor) public view returns (bool) {
    return _allowance[_user][doctor];
  }

  function _approveDataUser(address _user, address doctor, bool status) internal {
    _allowance[_user][doctor] = status;
    emit UserApprove(_user, doctor, status);
  }

 

}
