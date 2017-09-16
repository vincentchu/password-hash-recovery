// @flow

type EventType = 'PasswordCracked' | 'AttemptFailed'

type Event = {
  transactionHash: string,
  args: Object,
}

export type EventsStore = {
  [address: string]: {
    [eventType: EventType]: Event[],
  },
}

const UPDATE_EVENTS = 'events/UPDATE_EVENTS'

export const reducer = (
  state: EventsStore = {},
  action: {
    type: string,
    address?: string,
    eventType?: EventType,
    events?: Event[]
  }
): EventsStore => {
  switch (action.type) {
    case UPDATE_EVENTS: {
      const { address, events, eventType } = action

      if (address && events && eventType) {
        return {
          ...state,
          [address]: { [eventType]: events },
        }
      }

      return state
    }

    default:
      return state
  }
}

export const updateEvents = (address: string, eventType: EventType, events: Event[]) => ({
  type: UPDATE_EVENTS,
  address,
  eventType,
  events,
})