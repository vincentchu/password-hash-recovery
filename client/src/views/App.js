// @flow
import React from 'react'
import { connect } from 'react-redux'
import { checkWeb3 } from '../state/session'

import type { SessionStore } from '../state/session'

import './App.css'

const pollForWeb3 = (dispatch: Function) => {
  let nTimes = 0
  const poller = () => {
    dispatch(checkWeb3())
    nTimes += 1

    if (nTimes < 100000) {
      setTimeout(poller, 200)
    }
  }

  poller()
}

class App extends React.Component {
  componentWillMount() {
    pollForWeb3(this.props.dispatch)
  }

  props: {
    dispatch: Function,
    children?: any,
    web3Present: bool,
  }

  render() {
    return (
      <div>
        <div className="container">
          { this.props.children }
        </div>

        <div className="footer" />
      </div>
    )
  }
}

const mapStateToProps = (state: {
  session: SessionStore
}) => {
  const { session: { web3Present } } = state

  return { web3Present }
}

export default connect(mapStateToProps)(App)
