// @flow
import React from 'react'
import { compose } from 'ramda'
import { Button, ButtonToolbar, Glyphicon } from 'react-bootstrap'
import { Field, formValues, reduxForm, startAsyncValidation, stopAsyncValidation } from 'redux-form'
import classnames from 'classnames'

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

const PasswordForm = (props: {
  coinbase: string,
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
    coinbase, deployedContract, dispatch, plaintext, handleSubmit,
    error, submitting, pristine, asyncValidating,
  } = props

  const onSubmit = ({ plaintext }) => {
    if (deployedContract) {
      const promise = new Promise((resolve, reject) => {
        deployedContract.solve(plaintext, (err, tx) => {
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
      deployedContract.solve.call(plaintext, { from: coinbase }, (err, result) => {
        const errors = result ? {} : { plaintext: 'Incorrect plaintext' }

        const elapsed = (new Date()) - startedAt
        const timeToWait = Math.max(0, 1000 - elapsed)

        setTimeout(() => dispatch(stopAsyncValidation('contract', errors)), timeToWait)
      })
    }
  }

  const disableForm = !deployedContract || (submitting || pristine || asyncValidating)

  return (
    <div className="password-form">
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
  )
}

export default compose(
  reduxForm({ form: 'contract' }),
  formValues('plaintext')
)(PasswordForm)
