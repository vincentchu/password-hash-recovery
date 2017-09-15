// @flow
import React from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { Button, ButtonToolbar, Panel } from 'react-bootstrap'
import { Field, reduxForm, startAsyncValidation, stopAsyncValidation } from 'redux-form'

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
}) => {
  const {contract, bounty, deployedContract, handleSubmit, dispatch } = props
  const { title, panelStyle, contractAddress, passwordSha1Hash } = contract
  console.log('>>>', props)

  const header = (<h3>{ title }</h3>)
  const onSubmit = (values) => console.log('VALS', values)

  const onTest = () => {
    if (deployedContract) {
      dispatch(startAsyncValidation('contract'))
      deployedContract.solve.call('foo', (err, result) => {
        console.log('ERR', err)
        console.log('RESULT', result)

        const errors = result ? {} : { plaintext: 'did not match' }

        dispatch(stopAsyncValidation('contract', errors))

      })
    }
  }

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

            <ButtonToolbar>
              <Button onClick={onTest}>
                Test
              </Button>
              <Button>
                Submit
              </Button>
            </ButtonToolbar>
          </form>
        </div>
      </Panel>
    </div>
  )
}

export default compose(
  loadContract,
  connect(),
  reduxForm({ form: 'contract' })
)(ContractView)