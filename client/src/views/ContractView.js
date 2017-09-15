// @flow
import React from 'react'
import { Panel } from 'react-bootstrap'
import loadContract from './load-contract'

import type { BigNumber } from 'big-number'

const truncateAddr = (addr: string): string => {
  const firstPart = addr.slice(0, 8)
  const lastPart = addr.slice(-7, -1)

  return `${firstPart}...${lastPart}`
}

const linkForAddr = (addr: string) => `https://etherscan.io/address/${addr}`

const ContractView = (props: {
  panelStyle: string,
  title: string,
  contractAddress: string,
  passwordSha1Hash: string,
  bounty: ?BigNumber,
  deployedContract: ?Object,
}) => {
  const { panelStyle, title, contractAddress, passwordSha1Hash, bounty, deployedContract } = props

  const header = (<h3>{ title }</h3>)

  return (
    <div>
      <Panel bsStyle={panelStyle} header={header}>
        <div>
          <dl className="dl-horizontal">
            <dt>Contract Address</dt>
            <dd>
              <a href={linkForAddr(contractAddress)}>
                { truncateAddr(contractAddress) }
              </a>
            </dd>

            <dt>Password SHA1 Hash</dt>
            <dd>{ truncateAddr(passwordSha1Hash) }</dd>

            <dt>Bounty</dt>
            <dd>{ bounty && bounty.valueOf() }</dd>
          </dl>
        </div>
      </Panel>
    </div>
  )
}

export default loadContract(ContractView)