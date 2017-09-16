// @flow
import React from 'react'

import type { Contract } from '../state/contracts'
import type { BigNumber } from 'big-number'

const truncateAddr = (addr: string): string => {
  const firstPart = addr.slice(0, 8)
  const lastPart = addr.slice(-7, -1)

  return `${firstPart}...${lastPart}`
}

const linkForAddr = (addr: string) => `https://etherscan.io/address/${addr}`

const ContractMetadata = (props: {
  contract: Contract,
  bounty?: BigNumber,
}) => {
  const {
    bounty,
    contract: { contractAddress, passwordSha1Hash },
  } = props

  return (
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
  )
}

export default ContractMetadata