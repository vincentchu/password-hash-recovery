// @flow
import React from 'react'
import { Panel } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'
import classnames from 'classnames'
import loadContract from './load-contract'

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
  panelStyle: string,
  title: string,
  contractAddress: string,
  passwordSha1Hash: string,
  bounty: ?BigNumber,
  deployedContract: ?Object,
}) => {
  const { panelStyle, title, contractAddress, passwordSha1Hash, bounty, deployedContract, handleSubmit } = props
  console.log('>>>', props)

  const header = (<h3>{ title }</h3>)
  const onSubmit = (values) => console.log('VALS', values)

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
          </form>
        </div>
      </Panel>
    </div>
  )
}

export default loadContract(reduxForm({ form: 'contract' })(ContractView))