pragma solidity ^0.4.15;

import { SHA1 } from './SHA1.sol';

contract PasswordHashRecovery is SHA1 {
  event PasswordCracked(address crackedBy, uint256 bounty, string password, bytes hash);
  event AttemptFailed(address source, string password, bytes hash);

  address public owner;
  uint256 public bounty;
  bytes20 public hash;

  function PasswordHashRecovery(bytes20 _hash) payable {
    owner = msg.sender;
    bounty = msg.value;
    hash = _hash;
  }

  function solve(string password) returns (bool) {
    var hashedPassword = digest(password);

    if (sha3(hashedPassword) == sha3(hash)) {
      msg.sender.transfer(this.balance);
      PasswordCracked(msg.sender, bounty, password, hashedPassword);

      return true;
    }

    AttemptFailed(msg.sender, password, hashedPassword);
    return false;
  }
}