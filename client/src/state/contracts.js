// @flow

export type Network = 'development' | 'rinkeby' | 'main'

export type Contract = {
  title: string,
  panelStyle: string,
  contractAddress: string,
  passwordSha1Hash: string,
}

export type ContractStore = {
  [key: Network]: Contract[]
}

const initState = {
  development: [
    {
      title: 'Easy Difficulty',
      panelStyle: 'success',
      contractAddress: '0x9ad463357ddd5fea6b0150a9948a4fc447c07346',
      passwordSha1Hash: '0xa9993e364706816aba3e25717850c26c9cd0d89d',
    },
    {
      title: 'Medium Difficulty',
      panelStyle: 'warning',
      contractAddress: '0x9ad463357ddd5fea6b0150a9948a4fc447c07346',
      passwordSha1Hash: '0xa9993e364706816aba3e25717850c26c9cd0d89d',
    },
    {
      title: 'Challenging Difficulty',
      panelStyle: 'danger',
      contractAddress: '0x9ad463357ddd5fea6b0150a9948a4fc447c07346',
      passwordSha1Hash: '0xa9993e364706816aba3e25717850c26c9cd0d89d',
    },
  ],
}

export const reducer = (
  state: ContractStore = initState,
  action: { type: string }
): ContractStore => {
  switch (action.type) {
    default:
      return state
  }
}