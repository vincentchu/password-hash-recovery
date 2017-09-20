// @flow
import React from 'react'
import { Alert } from 'react-bootstrap'
import Warning from './Warning'

import type { NetworkType } from '../state/session'

const ValidNetworks = new Set([ 'development', 'rinkeby' ])

const ContractHeader = (props: {
  web3Present: bool,
  network: NetworkType,
}) => {
  const { web3Present, network } = props
  const validNetwork = ValidNetworks.has(network)

  return (
    <div>
      <h2>Deployed Contracts</h2>

      { !web3Present && <Warning /> }

      { web3Present && validNetwork && (
        <Alert bsStyle="success">
          <strong>Current Network: { network }</strong> This network is supported!
        </Alert>
      ) }

      { web3Present && !validNetwork && (
        <Alert bsStyle="warning">
          <strong>Current Network: { network} </strong> This network is not current supported.
          { ' ' }
          Please change to the Ethereum Main or Rinkeyby Networks.
        </Alert>
      ) }
    </div>
  )
}

export default ContractHeader