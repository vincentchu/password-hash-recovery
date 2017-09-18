// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bountyFor, passwordCrackedEventsFor, attemptFailedEventsFor } from './helpers'
import { updateEvents } from '../state/events'

import type { Contract } from '../state/contracts'
import type { SessionStore } from '../state/session'
import type { BigNumber } from 'bignumber.js'

// $FlowFixMe - Flow can't see into the truffle dir
import PasswordHashRecovery from '../../../truffle/build/contracts/PasswordHashRecovery.json' // eslint-disable-line

const loadContractEvents = (contract: Object, dispatch: Function): Promise<bool> => {
  const contractAddress = contract.address

  return Promise.all([
    passwordCrackedEventsFor(contract),
    attemptFailedEventsFor(contract),
  ]).then(([ crackedEvts, failedEvts ]) => {
    dispatch(updateEvents(contractAddress, 'PasswordCracked', crackedEvts))
    dispatch(updateEvents(contractAddress, 'AttemptFailed', failedEvts))

    return true
  })
}

const pollForEvents = (contract: Object, dispatch: Function) => {
  let nTimes = 0
  const poller = () => {
    loadContractEvents(contract, dispatch)
    nTimes += 1

    if (nTimes < 1000) {
      setTimeout(poller, 5000)
    }
  }

  poller()
}

const mapStateToProps = (state: {
  form: Object,
  session: SessionStore
}) => ({
  web3Present: state.session.web3Present,
  coinbase: state.session.coinbase,
})

const loadContract = (BaseComponent: Function | typeof React.Component) => {
  class WrappedComponent extends React.Component {
    constructor(props: Object) {
      super(props)
      this.state = {
        bounty: undefined,
        deployedContract: undefined,
        loaded: false,
      }
    }

    state: {
      bounty: ?BigNumber,
      deployedContract: ?Object,
      loaded: bool,
    }

    componentWillReceiveProps(newProps) {
      if (!this.state.loaded && newProps.web3Present) {
        this.loadContract(this.props.contract.contractAddress)
      }
    }

    loadContract = (contractAddress: string) => {
      const contract = window.web3.eth.contract(PasswordHashRecovery.abi)

      try {
        const deployedContract = contract.at(contractAddress)
        window.deployedContract = deployedContract

        Promise.all([
          bountyFor(deployedContract),
          loadContractEvents(deployedContract, this.props.dispatch),
        ]).then(([ bounty ]) => {
          this.setState({
            loaded: true,
            deployedContract,
            bounty,
          })
        })

        // pollForEvents(deployedContract, this.props.dispatch)
      } catch (err) {
        console.log('Error on contract instantiation:', err)  // eslint-disable-line no-console
      }
    }

    props: {
      web3Present: bool,
      coinbase: ?string,
      contract: Contract,
      dispatch: Function,
    }

    render() {
      return (
        <BaseComponent
          {...this.props} bounty={this.state.bounty} deployedContract={this.state.deployedContract}
        />
      )
    }
  }

  return connect(mapStateToProps)(WrappedComponent)
}

export default loadContract