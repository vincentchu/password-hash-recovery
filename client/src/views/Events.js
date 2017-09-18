// @flow
import React from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { reverse } from 'ramda'
import { HashLink } from './helpers'

import type { Event, EventsStore } from '../state/events'
import type { SessionStore } from '../state/session'
import type { Contract } from '../state/contracts'

const EventsTable = (props: {
  title: string,
  emptyText: string,
  events: Event[],
  coinbase: ?string,
}) => {
  const { coinbase, title, emptyText, events } = props

  return (
    <div className="row events-table">
      <div className="col-md-12">
        <h4>{ title }</h4>

        { events.length === 0 && emptyText }

        { events.length > 0 && (
          <Table condensed hover>
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Plaintext Password</th>
              </tr>
            </thead>
            <tbody>
              { reverse(events).map((evt) => (
                <tr key={evt.transactionHash}>
                  <td>
                    <HashLink addr={evt.transactionHash} truncate />
                    { coinbase === (evt.args.source || evt.args.crackedBy || -1) && ' (you)' }
                  </td>
                  <td>{evt.args.password}</td>
                </tr>
              )) }
            </tbody>
          </Table>
        ) }
      </div>
    </div>
  )
}

const Events = (props: {
  coinbase: ?string,
  passwordCrackedEvents: Event[],
  attemptFailedEvents: Event[],
}) => {
  const { coinbase, passwordCrackedEvents, attemptFailedEvents } = props
  return (
    <div>
      <EventsTable
        title="Successful Cracks" emptyText="No Successful Cracks"
        events={passwordCrackedEvents} coinbase={coinbase}
      />

      <EventsTable
        title="Failed Attempts" emptyText="No Failed Attempts"
        events={attemptFailedEvents} coinbase={coinbase}
      />
    </div>
  )
}

const mapStateToProps = (
  state: {
    session: SessionStore,
    events: EventsStore,
  },
  props: { contract: Contract }
) => {
  const address = props.contract.contractAddress
  const coinbase = state.session.coinbase
  const events = state.events[address] || {}

  const passwordCrackedEvents = events.PasswordCracked || []
  const attemptFailedEvents = events.AttemptFailed || []

  return {
    coinbase,
    passwordCrackedEvents,
    attemptFailedEvents,
  }
}


export default connect(mapStateToProps)(Events)