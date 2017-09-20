// @flow
import React from 'react'
import { connect } from 'react-redux'
import ContractHeader from './ContractHeader'
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
      </div>

      <Exposition />

      <ContractHeader web3Present={web3Present} network={network} />

      <div className="row">
        { contracts.map((contract, i) => (
          <div key={i} className="col-md-4">
            <ContractView contract={contract} form={contract.contractAddress} />
          </div>
        )) }
      </div>
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

  const currContracts = contracts[network] || contracts.rinkeby

  return {
    network,
    web3Present,
    contracts: currContracts,
  }
}

export default connect(mapStateToProps)(Home)