// @flow
import React from 'react'

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