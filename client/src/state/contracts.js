// @flow
import { mergeDeepRight } from 'ramda'

export type Network = 'development' | 'rinkeby' | 'main'

export type Contract = {
  title: string,
  panelStyle: string,
  contractAddress: string,
  passwordSha1Hash: string,
  validTest: bool,
}

export type ContractStore = {
  [key: Network]: Contract[]
}

const mergeValidity = (contracts: Contract[], address: string, validity: ?bool): Contract[] => {
  const updatedContracts = []

  contracts.forEach((contract) => {
    if (contract.contractAddress === address) {
      contract.validTest = validity
    }

    updatedContracts.push(contract)
  })

  return updatedContracts
}

const initState = {
  development: [
    {
      title: 'Easy Difficulty',
      panelStyle: 'success',
      contractAddress: '0x9ad463357ddd5fea6b0150a9948a4fc447c07346',
      passwordSha1Hash: '0xa9993e364706816aba3e25717850c26c9cd0d89d',
      validTest: false,
    },
    {
      title: 'Medium Difficulty',
      panelStyle: 'warning',
      contractAddress: '0x836ae85ccef18ef6738d9f8fa0f2e118ec804c1c',
      passwordSha1Hash: '0x1fec866296c698141c2e8e0ed21da0ba23c848f1',
    },
    // {
    //   title: 'Challenging Difficulty',
    //   panelStyle: 'danger',
    //   // contractAddress: '0x9ad463357ddd5fea6b0150a9948a4fc447c07346',
    //   contractAddress: '0x9ad463357ddd5fea6b0150a9948a4fc447c07346-zzz',
    //   passwordSha1Hash: '0xa9993e364706816aba3e25717850c26c9cd0d89d',
    // },
  ],
}

const UPDATE_VALIDITY = 'contracts/UPDATE_VALIDITY'

export const reducer = (
  state: ContractStore = initState,
  action: {
    type: string,
    network?: Network,
    address?: string,
    validity?: bool,
  }
): ContractStore => {
  switch (action.type) {
    case UPDATE_VALIDITY: {
      const { network, address, validity } = action

      if (network && address) {
        const updatedContracts = mergeValidity(state[network] || [], address, validity)

        return mergeDeepRight(state, { [network]: updatedContracts })
      }

      return state
    }

    default:
      return state
  }
}

export const updateValidity = (network: Network, address: string, validity: bool) => ({
  type: UPDATE_VALIDITY,
  network,
  address,
  validity,
})
