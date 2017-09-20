// @flow
/* eslint-disable max-len */
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

      <p>
        We have deployed three separate smart contracts on the main {' ' }
        Ethereum network. To facilitate testing, we have also deployed the same contracts on {' '}
        the <a href="https://www.rinkeby.io/">Rinkeby testnet</a>. Each contract is instantiated {' '}
        with the SHA1 hash of a password and some Ether as a monetary reward. Entering the correct plaintext password into the text field and submitting it will call the {' ' }
        <code>.solve(...)</code> method of the smart contract, { ' ' }
        leading to the transfer of the monetary reward to the caller. The three { ' ' }
        contracts have different difficulties, representing the difficulty of cracking each { ' ' }
        password.
      </p>

      <p>
        <strong>Note:</strong> Callers must pay for the gas used when submitting a guess. You can test whether or not your guess is correct, without any charge, by using the "Test" button.
      </p>

      { !web3Present && <Warning /> }

      { web3Present && validNetwork && (
        <Alert bsStyle="success">
          <strong>Current Network: { network }</strong> This network is supported.
        </Alert>
      ) }

      { web3Present && !validNetwork && (
        <Alert bsStyle="warning">
          <strong>Current Network: { network} </strong> This network is not current supported.
          { ' ' }
          Please change to the Ethereum Main or Rinkeyby Network.
        </Alert>
      ) }
    </div>
  )
}

export default ContractHeader