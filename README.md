# Smart Contracts for Cracking Passwords

[Vincent Chu (@vincentchu)](https://twitter.com/vincentchu), Initialized Capital

A powerful feature of the [Ethereum blockchain protocol](https://ethereum.org/) is its support for [smart contracts](https://en.wikipedia.org/wiki/Smart_contract): self-executing contracts, written in computer code, that can enforce their own terms apart from any human intervention. Here we present smart contracts for cracking passwords: each smart contract is instantiated with the SHA1 hash of a password and a bounty, denominated in Ether. Calling the smart contract with the correct plaintext password executes its terms and automatically transfers the Ether bounty from the contract to the caller. Password cracking constitutes an ideal digital good for smart contracts to mediate as the entire transaction can be conducted on the blockchain, without the need for any external oracles. Moreoever, plaintext passwords are valuable, depending what they secure or whom they belong to. Smart contracts that incentivize password cracking would allow for markets to be created to capture this value, while also encouraging the use of stronger passwords and hashing algorithms.

## Introduction

Passwords are ubiquitous features of online services and used as the primary method to authenticate users on a variety of sites ranging from social media, financial services, to government services. Passwords are typically not stored as _plaintext_; instead, they are typically hashed through a hashing function, and the _hashed password_ is saved. When a user attempts to login, the supplied password is again hashed with the same hashing function, and the hashed password is compared against the previously stored version. If they match, the user is granted access.

Despite their importance in preventing unauthorized access, password security remains persistently weak. Users often do not pick hard-to-guess passwords. 
