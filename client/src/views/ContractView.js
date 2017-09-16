// @flow
import React from 'react'
import { Panel } from 'react-bootstrap'
import loadContract from './load-contract'
import ContractMetadata from './ContractMetadata'
import PasswordForm from './PasswordForm'

import type { Contract } from '../state/contracts'
import type { BigNumber } from 'big-number'

const ContractView = (props: {
  coinbase: ?string,
  contract: Contract,
  bounty: ?BigNumber,
  deployedContract: ?Object,
  dispatch: Function,
}) => {
  const { coinbase, contract, bounty, deployedContract } = props
  const { title, panelStyle } = contract

  const header = (<h3>{ title }</h3>)

  return (
    <div>
      <Panel bsStyle={panelStyle} header={header}>
        <ContractMetadata bounty={bounty} contract={contract} />

        <PasswordForm coinbase={coinbase} deployedContract={deployedContract} />
      </Panel>
    </div>
  )
}

export default loadContract(ContractView)