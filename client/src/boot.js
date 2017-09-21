// @flow
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import routes from './routes'
import store from './redux-store'
import Web3 from 'web3'

console.log('We', Web3)

if (typeof window.web3 !== 'undefined' && window.web3.currentProvider) {
  console.log('HERE')
  window.web3 = new Web3(window.web3.currentProvider)
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
