// @flow
import React from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { Button, ButtonToolbar, Glyphicon } from 'react-bootstrap'
import { Field, formValues, reduxForm, startAsyncValidation, stopAsyncValidation } from 'redux-form'
import classnames from 'classnames'
import { solve } from './helpers'
import { sendEvent } from '../analytics'
import { updateValidity } from '../state/contracts'

import type { NetworkType } from '../state/session'
import type { ContractStore } from '../state/contracts'

const InputField = (props: {
  input: Object,
  name: string,
  placeholder: string,
  meta: { error: ?string },
  isValid: bool,
}) => {
  const {
    input,
    name,
    placeholder,
    isValid,
    meta: { error },
  } = props

  const succ = isValid && 'Correct plaintext'

  return (
    <div className={classnames('form-group', error && 'has-error', isValid && 'has-success')}>
      <label className="control-label" htmlFor={name}>
        { placeholder }
      </label>
      <input className="form-control" placeholder={placeholder} {...input} />
      <span className="help-block">{ error }{ succ }</span>
    </div>
  )
}

const PasswordForm = (props: {
  network: NetworkType,
  coinbase: string,
  deployedContract: ?Object,
  dispatch: Function,
  handleSubmit: Function,
  reset: Function,
  error: bool,
  submitting: bool,
  pristine: bool,
  asyncValidating: bool,
  validTest: bool,
  plaintext: ?string,
}) => {
  const {
    network, coinbase, deployedContract, dispatch, validTest, plaintext, handleSubmit, reset,
    error, submitting, pristine, asyncValidating,
  } = props
  const onSubmit = ({ plaintext }) => {
    const contract = deployedContract && deployedContract.address || 'unk'
    sendEvent('solve', { plaintext, contract })

    return solve(deployedContract, plaintext).then(reset)
  }

  const onTest = () => {
    if (deployedContract) {
      sendEvent('test', { plaintext, contract: deployedContract.address })
      dispatch(startAsyncValidation(deployedContract.address))
      const startedAt = new Date()
      deployedContract.solve.call(plaintext, { from: coinbase }, (err, result) => {
        const errors = result ? {} : { plaintext: 'Incorrect plaintext' }

        const elapsed = (new Date()) - startedAt
        const timeToWait = Math.max(0, 1000 - elapsed)

        setTimeout(() => {
          dispatch(stopAsyncValidation(deployedContract.address, errors))
          dispatch(updateValidity(network, deployedContract.address, result))
        }, timeToWait)
      })
    }
  }

  const disableForm = !deployedContract || (submitting || pristine || asyncValidating)

  return (
    <div className="password-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          id="plaintext" name="plaintext" placeholder="Plaintext Password" isValid={validTest}
          component={InputField}
        />

        <div className="button-bar">
          <ButtonToolbar>
            <Button onClick={onTest} disabled={disableForm}>
              Test
            </Button>
            <Button bsStyle="primary" type="submit" disabled={disableForm || error}>
              Submit
            </Button>
          </ButtonToolbar>
          <div className="status">
            <div className={classnames('spinner', (asyncValidating || submitting) && 'show')}>
              <Glyphicon glyph="refresh" />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (
  state: { contracts: ContractStore },
  props: { network: NetworkType, deployedContract: ?Object }
) => {
  const { deployedContract, network } = props
  const addr = deployedContract && deployedContract.address
  const contract = (state.contracts[network] || []).filter(
    (contract) => contract.contractAddress === addr
  )[0]

  const validTest = (contract && contract.validTest) || false

  return ({ validTest })
}

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'contract' }),
  formValues('plaintext')
)(PasswordForm)
