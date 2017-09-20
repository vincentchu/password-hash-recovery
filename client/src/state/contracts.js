// @flow
import { mergeDeepRight } from 'ramda'

import type { NetworkType } from './session'

export type Contract = {
  title: string,
  panelStyle: string,
  contractAddress: string,
  passwordSha1Hash: string,
  validTest: bool,
}

export type ContractStore = {
  [key: NetworkType]: Contract[]
}

const mergeValidity = (contracts: Contract[], address: string, validity: ?bool): Contract[] => {
  const updatedContracts = []

  contracts.forEach((contract) => {
    if (contract.contractAddress === address) {
      contract.validTest = validity || false
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
      passwordSha1Hash: '0xf3bbbd66a63d4bf1747940578ec3d0103530e21d',
      validTest: false,
    },
    {
      title: 'Medium Difficulty',
      panelStyle: 'warning',
      contractAddress: '0x836ae85ccef18ef6738d9f8fa0f2e118ec804c1c',
      passwordSha1Hash: '0x9373e7c1555c33721d878e445a812cc577719a61',
      validTest: false,
    },
    {
      title: 'Challenging Difficulty',
      panelStyle: 'danger',
      contractAddress: '0xce7d7e78270ceaee4c1f93f96802a504a84b6eaa',
      passwordSha1Hash: '0x1cee85b543db7ce8d3536e6a542ddb77d15009d7',
      validTest: false,
    },
  ],

  rinkeby: [
    {
      title: 'Easy Difficulty',
      panelStyle: 'success',
      contractAddress: '0xaf348b3d2e4a9e7924abd1732354c71e21e9eb25',
      passwordSha1Hash: '0xf3bbbd66a63d4bf1747940578ec3d0103530e21d',
      validTest: false,
    },
    {
      title: 'Medium Difficulty',
      panelStyle: 'warning',
      contractAddress: '0x327892bfaac14de1fdfdef3ef0dd5caf10b55292',
      passwordSha1Hash: '0x9373e7c1555c33721d878e445a812cc577719a61',
      validTest: false,
    },
    {
      title: 'Challenging Difficulty',
      panelStyle: 'danger',
      contractAddress: '0x7c45ff1f2738827d4f89b3cf5f87bb36f939a2c0',
      passwordSha1Hash: '0x1cee85b543db7ce8d3536e6a542ddb77d15009d7',
      validTest: false,
    },
  ],
}

const UPDATE_VALIDITY = 'contracts/UPDATE_VALIDITY'

export const reducer = (
  state: ContractStore = initState,
  action: {
    type: string,
    network?: NetworkType,
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

export const updateValidity = (network: NetworkType, address: string, validity: bool) => ({
  type: UPDATE_VALIDITY,
  network,
  address,
  validity,
})
