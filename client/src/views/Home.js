// @flow
import React from 'react'
import { connect } from 'react-redux'
import ContractHeader from './ContractHeader'
import ContractImplementation from './ContractImplementation'
import ContractView from './ContractView'
import Exposition from './Exposition'

import type { NetworkType, SessionStore } from '../state/session'
import type { Contract, ContractStore } from '../state/contracts'

const Home = (props: {
  network: NetworkType,
  web3Present: bool,
  contracts: Contract[],
}) => {
  const { network, web3Present, contracts } = props

  return (
    <div>
      <div className="page-header">
        <h1>Smart Contracts for Cracking Passwords</h1>
        <div className="by-line">
          <a href="https://twitter.com/vincentchu">Vincent Chu (@vincentchu)</a>,{' '}
          Initialized Capital
        </div>
      </div>

      <Exposition />

      <ContractHeader web3Present={web3Present} network={network} />

      <div className="row">
        { contracts.map((contract, i) => (
          <div key={i} className="col-md-4">
            <ContractView network={network} contract={contract} form={contract.contractAddress} />
          </div>
        )) }
      </div>

      <ContractImplementation />
    </div>
  )
}

const mapStateToProps = (state: {
  session: SessionStore,
  contracts: ContractStore,
}) => {
  const {
    session: { network, web3Present },
    contracts,
  } = state

  const currContracts = contracts[network] || contracts.main

  return {
    network,
    web3Present,
    contracts: currContracts,
  }
}

export default connect(mapStateToProps)(Home)