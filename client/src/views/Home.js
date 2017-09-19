// @flow
import React from 'react'
import { connect } from 'react-redux'
import ContractView from './ContractView'

import type { Contract, ContractStore } from '../state/contracts'

const Home = (props: {
  contracts: Contract[],
}) => (
  <div>
    <div className="page-header">
      <h1>
        Smart Contracts for Cracking Passwords
      </h1>
      <div className="by-line">
        <a href="https://twitter.com/vincentchu">Vincent Chu (@vincentchu)</a>, { ' ' }
        <a href="https://initialized.com/">Initialized Capital</a>
      </div>
    </div>

    <div className="row">
      <div className="col-md-12">
        <p className="lead abstract">
          A powerful feature of the <a href="">Ethereum blockchain protocol</a> is its support for smart contracts: self-executing contracts, written in computer code, that can enforce their own terms apart from any human intervention. Here we present smart contracts for cracking passwords: each smart contract is instantiated with the SHA1 hash of a password and a bounty, denominated in Ether. Calling the smart contract with the correct plaintext password executes its terms and automatically transfers the Ether bounty from the contract to the caller. Password cracking constitutes an ideal digital good for smart contracts to mediate as the entire transaction can be conducted on the blockchain, without the need for any external oracles. Moreoever, plaintext passwords are valuable, depending what they secure or whom they belong to. Smart contracts that incentivize password cracking would allow for markets to be created to capture this value, while also encouraging the use of stronger passwords.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </div>
    </div>

    <div>
      <h2>Deployed Contracts</h2>
    </div>

    <div className="row">
      { props.contracts.map((contract, i) => (
        <div key={i} className="col-md-4">
          <ContractView contract={contract} form={contract.contractAddress} />
        </div>
      )) }
    </div>
  </div>
)

const mapStateToProps = (state: {
  contracts: ContractStore,
}) => {
  const contracts = state.contracts.development

  return { contracts }
}

export default connect(mapStateToProps)(Home)