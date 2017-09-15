// @flow

export type SessionStore = {
  web3Present: bool,
}

const InitialState = { web3Present: false }

const CHECK_WEB3 = 'session/CHECK_WEB3'

export const reducer = (
  state: SessionStore = InitialState,
  action: { type: string }
): SessionStore => {
  switch (action.type) {
    case CHECK_WEB3: {
      const web3Present = typeof window.web3 !== 'undefined'

      return {
        ...state,
        web3Present,
      }
    }

    default:
      return state
  }
}

export const checkWeb3 = () => ({ type: CHECK_WEB3 })
