// @flow
import React from 'react'
import { Panel } from 'react-bootstrap'

// $FlowFixMe - Flow can't see into the truffle dir
import PasswordHashRecovery from '../../../truffle/build/contracts/PasswordHashRecovery.json' // eslint-disable-line

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
}) => {
  const { panelStyle, title, contractAddress, passwordSha1Hash } = props

  const header = (<h3>{ title }</h3>)
  // console.log('FOO', PasswordHashRecovery)
  // window.Contract = PasswordHashRecovery

  // const contract = window.web3.eth.contract(PasswordHashRecovery.abi)
  // const deployedContract = contract.at(contractAddress)
  // window.deployedContract = deployedContract

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
          </dl>
        </div>
      </Panel>
    </div>
  )
}

export default ContractView