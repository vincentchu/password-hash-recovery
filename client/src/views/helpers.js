// @flow
import React from 'react'

import type { Event } from '../state/events'
import type { BigNumber } from 'big-number'

export const truncateAddr = (addr: string): string => {
  const firstPart = addr.slice(0, 8)
  const lastPart = addr.slice(-7, -1)

  return `${firstPart}...${lastPart}`
}

export const linkForAddr = (addr: string) => `https://etherscan.io/address/${addr}`

export const HashLink = (props: {
  addr: string,
  truncate?: bool,
}) => {
  const { addr, truncate } = props
  const displayAddr = truncate ? truncateAddr(addr) : addr

  return (
    <a href={linkForAddr(addr)}>
      { displayAddr }
    </a>
  )
}

const promisify = (callback: Function) => {
  const promise = new Promise((resolve, reject) => {
    callback((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })

  return promise
}

export const bountyFor = (contract: Object): Promise<BigNumber> =>
  promisify(contract.bounty)

const TimeFrame = { fromBlock: 0, toBlock: 'latest' }

export const passwordCrackedEventsFor = (contract: Object): Promise<Event[]> => {
  // TODO(vc): Someting is weird here. Keep getting undefined errors if I try and pass the
  // `get` function in directly. Must be some scoping issue.
  const cb = (fn) => contract.PasswordCracked({}, TimeFrame).get(fn)

  return promisify(cb)
}

export const attemptFailedEventsFor = (contract: Object): Promise<Event[]> => {
  const cb = (fn) => contract.AttemptFailed({}, TimeFrame).get(fn)

  return promisify(cb)
}
