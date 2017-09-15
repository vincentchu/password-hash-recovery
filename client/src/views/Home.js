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
      <h1>Smart Contracts for Cracking Passwords</h1>
    </div>

    <div className="row">
      <div className="col-md-12">
        <p className="lead">
          Smart contracts can do a lot of things.
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
          <ContractView contract={contract} />
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