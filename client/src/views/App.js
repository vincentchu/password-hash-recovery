// @flow
import React from 'react'
import { connect } from 'react-redux'
import { checkWeb3 } from '../state/session'

class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(checkWeb3())
  }

  props: {
    dispatch: Function,
    children?: any
  }

  render() {
    return (
      <div>
        <div className="container">
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default connect()(App)
