// @flow

export type SessionStore = {
  web3Present: bool,
  coinbase: ?string,
}

const InitialState = {
  web3Present: false,
  coinbase: undefined,
}

const CHECK_WEB3 = 'session/CHECK_WEB3'

export const reducer = (
  state: SessionStore = InitialState,
  action: { type: string }
): SessionStore => {
  switch (action.type) {
    case CHECK_WEB3: {
      const web3Present = typeof window.web3 !== 'undefined'
      // $FlowFixMe - Can't instrospect type
      const coinbase: string = web3Present && window.web3.eth.coinbase

      return {
        ...state,
        web3Present,
        coinbase,
      }
    }

    default:
      return state
  }
}

export const checkWeb3 = () => ({ type: CHECK_WEB3 })
