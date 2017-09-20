// @flow
/* eslint-disable max-len */
import React from 'react'

const ContractImplementation = () => (
  <div>
    <h2>Contract Implementation</h2>

    <p>
      The smart contract is implemented in Solidity using <a href="http://truffleframework.com/">Truffle</a> as a development framework. You can view its source <a href="https://github.com/vincentchu/password-hash-recovery/blob/master/truffle/contracts/PasswordHashRecovery.sol">here</a>. {' '}
      Because there is no native implementation of the SHA1 hash function in the Ethereum Virtual Machine (EVM), I had to include a <a href="https://github.com/vincentchu/password-hash-recovery/blob/master/truffle/contracts/SHA1.sol">SHA1 implementation</a> in Solidity. {' '}
      This makes the contract somewhat expensive, in terms of gas, to execute. For a typical password length, I estimate the gas cost to be just over 270,000 gas, or around $1.57. The frontend application was created using <a href="https://metamask.io/">Metamask</a>. Source code for the smart contracts and the frontend application can be found on <a href="https://github.com/vincentchu/password-hash-recovery/">GitHub</a>.
    </p>

    <h4 className="splash">
      Building something interesting? <a href="https://twitter.com/@initializedcap">Initialized Capital</a> would love to talk with you.
    </h4>
  </div>
)

export default ContractImplementation