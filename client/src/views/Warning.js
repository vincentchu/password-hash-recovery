// @flow
import React from 'react'
import { Glyphicon, Panel } from 'react-bootstrap'

const MetamaskLink = 'https://metamask.io/'

const Header = (
  <h1>
    <Glyphicon glyph="exclamation-sign" /> Warning: Web3 Not Enabled!
  </h1>
)

const Warning = () => (
  <Panel className="header-warning" bsStyle="warning" header={Header}>
    You won't be able to interact with smart contracts. To enable Web3 please install the
    <a href={MetamaskLink}>MetaMask Chrome plugin</a>.
  </Panel>
)

export default Warning
