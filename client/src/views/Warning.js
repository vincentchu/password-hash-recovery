// @flow
import React from 'react'
import { Alert, Glyphicon } from 'react-bootstrap'

const MetamaskLink = 'https://metamask.io/'

const Warning = () => (
  <Alert className="header-warning" bsStyle="danger">
    <strong>
      <Glyphicon glyph="exclamation-sign" /> MetaMask Not Detected!
    </strong>
    {' '}
    You won't be able to interact with smart contracts. To enable please install the
    {' '} <a href={MetamaskLink} className="alert-link">MetaMask Chrome plugin</a>.
  </Alert>
)

export default Warning
