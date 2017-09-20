// @flow
import React from 'react'
import BigNumber from 'bignumber.js'

import type { NetworkType } from '../state/session'
import type { Event } from '../state/events'

export const truncateAddr = (addr: string): string => {
  const firstPart = addr.slice(0, 8)
  const lastPart = addr.slice(-7, -1)

  return `${firstPart}...${lastPart}`
}

export const linkForAddr = (network: NetworkType, addr: string) => {
  let host = ''
  switch (network) {
    case 'development':
      host = 'local.'
      break

    case 'rinkeby':
      host = 'rinkeby.'
      break

    case 'main':
      host = ''
      break

    case 'unknown':
      host = 'unk'
      break
  }

  return `https://${host}etherscan.io/address/${addr}`
}

export const HashLink = (props: {
  network: NetworkType,
  addr: string,
  truncate?: bool,
}) => {
  const { network, addr, truncate } = props
  const displayAddr = truncate ? truncateAddr(addr) : addr

  return (
    <a href={linkForAddr(network, addr)}>
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

export const displayDenomination = (value: BigNumber): string => {
  let denom = ''
  let divisor

  const expo = value.e
  switch (true) {
    case (expo >= 18):
      window.BigNumber = BigNumber
      denom = 'Ether'
      divisor = new BigNumber('1e+18')
      break

    case (expo < 18 && expo >= 15):
      denom = 'Finney'
      divisor = new BigNumber('1e+15')
      break

    case (expo < 15 && expo >= 12):
      denom = 'Szabo'
      divisor = new BigNumber('1e+12')
      break

    case (expo < 12 && expo >= 9):
      denom = 'Gwei'
      divisor = new BigNumber('1e+9')
      break

    case (expo < 9 && expo >= 6):
      denom = 'Mwei'
      divisor = new BigNumber('1e+6')
      break

    case (expo < 6 && expo >= 3):
      denom = 'KWei'
      divisor = new BigNumber('1e+3')
      break

    default:
      denom = 'Wei'
      divisor = new BigNumber('1e+0')
      break
  }

  const mantissa = value.dividedBy(divisor).toFixed(3)

  return `${mantissa} ${denom}`
}

export const bountyFor = (contract: Object): Promise<BigNumber> =>
  promisify(contract.bounty)

export const solve = (contract: ?Object, plaintext: string): Promise<any> => {
  if (contract) {
    // $FlowFixMe - Flow being stupid
    const cb = (fn) => contract.solve(plaintext, fn)

    return promisify(cb)
  }

  return Promise.resolve(true)
}

const TimeFrame = { fromBlock: 928811, toBlock: 'latest' }

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

export const getNetwork = (): NetworkType => {
  if (typeof window.web3 !== 'undefined') {
    const networkId = parseInt(window.web3.version.network)
    switch (networkId) {
      case 1:
        return 'main'

      case 4:
        return 'rinkeby'

      default:
        if (networkId > 100) {
          return 'development'
        }

        return 'unknown'
    }
  }

  return 'unknown'
}
