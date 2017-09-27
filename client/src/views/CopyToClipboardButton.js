// @flow
import React from 'react'
import { Button } from 'react-bootstrap'
import CopyToClipboard from 'react-copy-to-clipboard'
import { sendEvent } from '../analytics'

class CopyToClipboardButton extends React.Component {
  constructor(props: Object) {
    super(props)
    this.state = { buttonText: 'Copy' }
  }

  state: {
    buttonText: string
  }

  onClick = () => {
    sendEvent('copyButtonClick')
    this.setState({ buttonText: 'Copied' })
    setTimeout(() => {
      this.setState({ buttonText: 'Copy' })
    }, 1000)
  }

  props: {
    text: string
  }

  render() {
    return (
      <CopyToClipboard text={this.props.text}>
        <Button bsSize="xsmall" onClick={this.onClick}>
          { this.state.buttonText }
        </Button>
      </CopyToClipboard>
    )
  }
}

export default CopyToClipboardButton