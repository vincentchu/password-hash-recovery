// @flow
import type { SessionStore } from './state/session'

type State = {
  session: SessionStore
}

const logTransition = (attr: string, beforeSession: SessionStore, afterSession: SessionStore) => {
  const before = beforeSession[attr]
  const after = afterSession[attr]

  if (before !== after) {
    window.ga('send', {
      hitType: 'event',
      eventCategory: attr,
      eventAction: 'transition',
      eventLabel: String(after),
    })
  }
}

const logEventIfNeeded = (beforeState: State, afterState: State) => {
  try {
    if (typeof window.ga !== 'undefined') {
      const beforeSession = beforeState.session
      const afterSession = afterState.session

      logTransition('web3Present', beforeSession, afterSession)
      logTransition('network', beforeSession, afterSession)
      logTransition('coinbase', beforeSession, afterSession)
    }
  } catch (err) {
    console.log('Error on GA', err)
  }
}

const analytics = ({ getState }: { getState: Function }) => (next: any) => (action: any) => {
  const beforeState = getState()
  const ret = next(action)
  const afterState = getState()

  logEventIfNeeded(beforeState, afterState)

  return ret
}

export default analytics
