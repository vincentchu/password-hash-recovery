// @flow
import React from 'react'
import { connect } from 'react-redux'
import Warning from './Warning'
import { checkWeb3 } from '../state/session'

import type { SessionStore } from '../state/session'

import './App.css'

class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(checkWeb3())
  }

  props: {
    dispatch: Function,
    children?: any,
    web3Present: bool,
  }

  render() {
    return (
      <div>
        { !this.props.web3Present && <Warning /> }
        <div className="container">
          { this.props.children }
        </div>
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
