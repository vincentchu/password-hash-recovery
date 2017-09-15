// @flow
import React from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import type { SessionStore } from '../state/session'
import type { BigNumber } from 'big-number'

// $FlowFixMe - Flow can't see into the truffle dir
import PasswordHashRecovery from '../../../truffle/build/contracts/PasswordHashRecovery.json' // eslint-disable-line

const mapStateToProps = (state: {
  session: SessionStore
}) => ({ web3Present: state.session.web3Present })

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
        this.loadContract(this.props.contractAddress)
      }
    }

    loadContract = (contractAddress: string) => {
      const contract = window.web3.eth.contract(PasswordHashRecovery.abi)

      try {
        const deployedContract = contract.at(contractAddress)
        window.deployedContract = deployedContract

        deployedContract.bounty((err, bounty) => this.setState({
          loaded: true,
          deployedContract,
          bounty,
        }))

      } catch (err) {
        console.log('ERR', err)
      }
    }


    props: {
      web3Present: bool,
      contractAddress: string,
    }

    render() {
      return (
        <BaseComponent
          {...this.props} bounty={this.state.bounty} deployedContract={this.state.deployedContract}
        />
      )
    }
  }

  const randomId = Math.ceil(1000 * Math.random())
  console.log('Generated', randomId)

  return compose(
    connect(mapStateToProps),
    reduxForm({ form: `contract-${randomId}` })
  )(WrappedComponent)
}

export default loadContract