// @flow
/* eslint-disable max-len*/
import React from 'react'

const Exposition = () => (
  <div className="row">
    <div className="col-md-12">
      <p className="lead abstract">
        A powerful feature of the <a href="https://ethereum.org/">Ethereum blockchain protocol</a> is its support for <a href="https://en.wikipedia.org/wiki/Smart_contract">smart contracts</a>: self-executing contracts, written in computer code, that can enforce their own terms apart from any human intervention. Here we present smart contracts for cracking passwords: each smart contract is instantiated with the SHA1 hash of a password and a bounty, denominated in Ether. Calling the smart contract with the correct plaintext password executes its terms and automatically transfers the Ether bounty from the contract to the caller. Password cracking constitutes an ideal digital good for smart contracts to mediate as the entire transaction can be conducted on the blockchain, without the need for any external oracles.
      </p>
    </div>
  </div>
)

export default Exposition