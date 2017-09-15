// @flow
import React from 'react'
import { Alert, Glyphicon } from 'react-bootstrap'

const MetamaskLink = 'https://metamask.io/'

const Warning = () => (
  <Alert className="header-warning" bsStyle="warning">
    <strong>
      <Glyphicon glyph="exclamation-sign" /> Web3 Not Detected!
    </strong>
    {' '}
    You won't be able to interact with smart contracts. To enable Web3 please install the
    {' '} <a href={MetamaskLink} className="alert-link">MetaMask Chrome plugin</a>.
  </Alert>
)

export default Warning
