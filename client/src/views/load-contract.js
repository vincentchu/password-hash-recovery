// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bountyFor, passwordCrackedEventsFor, attemptFailedEventsFor } from './helpers'
import { updateEvents } from '../state/events'

import type { Contract } from '../state/contracts'
import type { SessionStore } from '../state/session'
import type { BigNumber } from 'big-number'

// $FlowFixMe - Flow can't see into the truffle dir
import PasswordHashRecovery from '../../../truffle/build/contracts/PasswordHashRecovery.json' // eslint-disable-line

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
          passwordCrackedEventsFor(deployedContract),
          attemptFailedEventsFor(deployedContract),
        ]).then(([ bounty, crackedEvts, failedEvts ]) => {
          this.setState({
            loaded: true,
            deployedContract,
            bounty,
          })

          this.props.dispatch(updateEvents(contractAddress, 'PasswordCracked', crackedEvts))
          this.props.dispatch(updateEvents(contractAddress, 'AttemptFailed', failedEvts))
        })
      } catch (err) {
        console.log('ERR', err)
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