// @flow
import React from 'react'
import CopyToClipboardButton from './CopyToClipboardButton'
import { displayDenomination, truncateAddr, linkForAddr } from './helpers'

import type { Contract } from '../state/contracts'
import type { BigNumber } from 'bignumber.js'

const ContractMetadata = (props: {
  contract: Contract,
  bounty?: BigNumber,
}) => {
  const {
    bounty,
    contract: { contractAddress, passwordSha1Hash },
  } = props

  let displayBounty = 'Loading'
  if (bounty) {
    if (bounty.valueOf() === '0') {
      displayBounty = '0 (Solved)'
    } else {
      displayBounty = displayDenomination(bounty)
    }
  }

  return (
    <div>
      <dl className="dl-horizontal">
        <dt>Contract Address</dt>
        <dd>
          <a href={linkForAddr(contractAddress)}>
            { truncateAddr(contractAddress) }
          </a>
        </dd>

        <dt>Current Bounty</dt>
        <dd>{ displayBounty }</dd>

        <dt>Password SHA1 Hash</dt>
        <dd>
          <div className="password-hash">
            { passwordSha1Hash }
          </div>
          <CopyToClipboardButton text={passwordSha1Hash} />
        </dd>
      </dl>
    </div>
  )
}

export default ContractMetadata