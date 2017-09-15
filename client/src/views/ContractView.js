// @flow
import React from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { Button, ButtonToolbar, Glyphicon, Panel } from 'react-bootstrap'
import { Field, formValues, reduxForm, startAsyncValidation, stopAsyncValidation } from 'redux-form'
import classnames from 'classnames'
import loadContract from './load-contract'

import type { Contract } from '../state/contracts'
import type { BigNumber } from 'big-number'

const truncateAddr = (addr: string): string => {
  const firstPart = addr.slice(0, 8)
  const lastPart = addr.slice(-7, -1)

  return `${firstPart}...${lastPart}`
}

const linkForAddr = (addr: string) => `https://etherscan.io/address/${addr}`

const InputField = (props: {
  input: Object,
  name: string,
  placeholder: string,
  meta: { error: ?string }
}) => {
  const {
    input,
    name,
    placeholder,
    meta: { error },
  } = props
  console.log('PROPS', props)

  return (
    <div className={classnames('form-group', error && 'has-error')}>
      <label className="control-label" htmlFor={name}>
        { placeholder }
      </label>
      <input className="form-control" placeholder={placeholder} {...input} />
      <span className="help-block">{ error }</span>
    </div>
  )
}

const ContractView = (props: {
  contract: Contract,
  bounty: ?BigNumber,
  deployedContract: ?Object,
  dispatch: Function,
  handleSubmit: Function,
  error: bool,
  submitting: bool,
  pristine: bool,
  asyncValidating: bool,
  plaintext: ?string,
}) => {
  const {
    contract, bounty, deployedContract, dispatch, plaintext,
    handleSubmit, error, submitting, pristine, asyncValidating,
  } = props
  const { title, panelStyle, contractAddress, passwordSha1Hash } = contract

  const onSubmit = ({ plaintext }) => {
    console.log('VALS', plaintext)

    if (deployedContract) {
      const promise = new Promise((resolve, reject) => {
        deployedContract.solve(plaintext, (err, tx) => {
          console.log('ERR', err)
          console.log('TX', tx)

          if (err) {
            reject(err)
          } else {
            resolve(tx)
          }
        })
      })

      return promise
    }

    return Promise.resolve(true)
  }

  const onTest = () => {
    if (deployedContract) {
      dispatch(startAsyncValidation('contract'))
      const startedAt = new Date()
      deployedContract.solve.call(plaintext, (err, result) => {
        const errors = result ? {} : { plaintext: 'Incorrect plaintext' }

        const elapsed = (new Date()) - startedAt
        const timeToWait = Math.max(0, 1000 - elapsed)

        setTimeout(() => dispatch(stopAsyncValidation('contract', errors)), timeToWait)
      })
    }
  }

  const disableForm = !deployedContract || (submitting || pristine || asyncValidating)

  const header = (<h3>{ title }</h3>)

  return (
    <div>
      <Panel bsStyle={panelStyle} header={header}>
        <div>
          <dl className="dl-horizontal">
            <dt>Contract Address</dt>
            <dd>
              <a href={linkForAddr(contractAddress)}>
                { truncateAddr(contractAddress) }
              </a>
            </dd>

            <dt>Password SHA1 Hash</dt>
            <dd>{ truncateAddr(passwordSha1Hash) }</dd>

            <dt>Bounty</dt>
            <dd>{ bounty && bounty.valueOf() }</dd>
          </dl>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field
              id="plaintext" name="plaintext" placeholder="Plaintext Password"
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
      </Panel>
    </div>
  )
}

export default compose(
  loadContract,
  connect(),
  reduxForm({ form: 'contract' }),
  formValues('plaintext')
)(ContractView)