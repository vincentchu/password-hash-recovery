module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
    },
    local: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
    },
    rinkeby: {
      host: 'localhost',
      port: 8545,
      from: '0x65df7722230418a8cef2954a4f36a5199fcdd338',
      network_id: '4',
    },
  },
}
