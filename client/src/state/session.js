// @flow
import { getNetwork } from '../views/helpers'

export type NetworkType = 'development' | 'rinkeby' | 'unknown'

export type SessionStore = {
  web3Present: bool,
  coinbase: ?string,
  network: NetworkType
}

const InitialState = {
  web3Present: false,
  network: 'unknown',
  coinbase: undefined,
}

const CHECK_WEB3 = 'session/CHECK_WEB3'
const SET_NETWORK = 'session/SET_NETWORK'

export const reducer = (
  state: SessionStore = InitialState,
  action: { type: string, network?: NetworkType }
): SessionStore => {
  switch (action.type) {
    case CHECK_WEB3: {
      const web3Present = typeof window.web3 !== 'undefined'
      // $FlowFixMe - Can't instrospect type
      const coinbase: string = web3Present && window.web3.eth.coinbase
      const network = web3Present && getNetwork() || 'unknown'

      return {
        ...state,
        web3Present,
        network,
        coinbase,
      }
    }

    case SET_NETWORK:
      return {
        ...state,
        network: action.network,
      }

    default:
      return state
  }
}

export const checkWeb3 = () => ({ type: CHECK_WEB3 })

export const setNetwork = (network: NetworkType) => ({
  type: SET_NETWORK,
  network,
})
