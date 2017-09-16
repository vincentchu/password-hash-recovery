// @flow
import React from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { HashLink } from './helpers'

import type { Event, EventsStore } from '../state/events'
import type { Contract } from '../state/contracts'

const EventsTable = (props: {
  title: string,
  events: Event[],
}) => {
  const { title, events } = props

  return (
    <div className="row">
      <div className="col-md-12">
        <h4>{title}</h4>
        <Table condensed hover>
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Plaintext Password</th>
            </tr>
          </thead>
          <tbody>
            { events.map((evt) => (
              <tr key={evt.transactionHash}>
                <td><HashLink addr={evt.transactionHash} truncate /></td>
                <td>{evt.args.password}</td>
              </tr>
            )) }
          </tbody>
        </Table>
      </div>
    </div>
  )
}

const Events = (props: {
  passwordCrackedEvents: Event[],
  attemptFailedEvents: Event[],
}) => {
  const { passwordCrackedEvents, attemptFailedEvents } = props
  return (
    <div>
      <EventsTable title="Successful Cracks" events={passwordCrackedEvents} />
      <EventsTable title="Failed Attempts" events={attemptFailedEvents} />
    </div>
  )
}

const mapStateToProps = (
  state: { events: EventsStore },
  props: { contract: Contract }
) => {
  const address = props.contract.contractAddress
  const events = state.events[address] || {}

  const passwordCrackedEvents = events.PasswordCracked || []
  const attemptFailedEvents = events.AttemptFailed || []

  return {
    passwordCrackedEvents,
    attemptFailedEvents,
  }
}


export default connect(mapStateToProps)(Events)