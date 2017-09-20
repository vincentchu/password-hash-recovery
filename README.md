# Smart Contracts for Cracking Passwords

[Vincent Chu (@vincentchu)](https://twitter.com/vincentchu), Initialized Capital

A powerful feature of the [Ethereum blockchain protocol](https://ethereum.org/) is its support for [smart contracts](https://en.wikipedia.org/wiki/Smart_contract): self-executing contracts, written in computer code, that can enforce their own terms apart from any human intervention. Here we present smart contracts for cracking passwords: each smart contract is instantiated with the SHA1 hash of a password and a bounty, denominated in Ether. Calling the smart contract with the correct plaintext password executes its terms and automatically transfers the Ether bounty from the contract to the caller. Password cracking constitutes an ideal digital good for smart contracts to mediate as the entire transaction can be conducted on the blockchain, without the need for any external oracles.

## Deployed Contracts

We have deployed three separate smart contracts on the main Ethereum network. To facilitate testing, we have also deployed the same contracts on the [Rinkeby testnet](https://www.rinkeby.io/). Each contract is instantiated with the SHA1 hash of a password and some Ether as a monetary reward. Entering the correct plaintext password into the text field and submitting it will call the `.solve(...)` method of the smart contract, leading to the transfer of the monetary reward to the caller. The three contracts have different difficulties, representing the difficulty of cracking each password.

**Note:** Callers must pay for the gas used when submitting a guess. You can test whether or not your guess is correct, without any charge, by using the "Test" button.

## Contract Implementation

The smart contract is implemented in Solidity using [Truffle](http://truffleframework.com/) as a development framework. You can view its source [here](https://github.com/vincentchu/password-hash-recovery/blob/master/truffle/contracts/PasswordHashRecovery.sol). Because there is no native implementation of the SHA1 hash function in the Ethereum Virtual Machine (EVM), I had to include a [SHA1 implementation](https://github.com/vincentchu/password-hash-recovery/blob/master/truffle/contracts/SHA1.sol) in Solidity. This makes the contract somewhat expensive, in terms of gas, to execute. For a typical password length, I estimate the gas cost to be just over 270,000 gas, or around $1.57. The frontend application was created using [Metamask](https://metamask.io/). Source code for the smart contracts and the frontend application can be found on [GitHub](https://github.com/vincentchu/password-hash-recovery/).

_Building something interesting? [Initialized Capital](https://twitter.com/@initializedcap) would love to talk with you._
