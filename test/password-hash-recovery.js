const PasswordHashRecovery = artifacts.require('./PasswordHashRecovery.sol')
const DefaultGasPrice = 100000000000

contract('PasswordHashRecovery', (accounts) => {
  it('should initialize the contract', (done) => {
    PasswordHashRecovery.deployed()
      .then((instance) => instance.bounty())
      .then((bounty) => {
        assert.equal(bounty.valueOf(), '218000000000', 'Bounty was of wrong size')
        done()
      })
  })

  it('should return false if incorrect plaintext password is provided', (done) => {
    const alice = accounts[0]

    PasswordHashRecovery.deployed()
      .then((instance) => instance.solve.call('bad password', { from: alice }))
      .then((status) => {
        assert.ok(!status, 'Bad password used to successfully solve challenge')

        done()
      })
  })

  it('should return true if correct plaintext password is provided', (done) => {
    const alice = accounts[0]

    PasswordHashRecovery.deployed()
      .then((instance) => instance.solve.call('abc', { from: alice }))
      .then((status) => {
        assert.ok(status, 'Correct password was not successful')

        done()
      })
  })

  it('should not transfer bounty and emit AttemptFailed event if solve was unsuccessful', (done) => {
    const alice = accounts[0]
    const initBalance = web3.eth.getBalance(alice)

    console.log('GASPRICE', web3.eth.gasPrice)

    PasswordHashRecovery.deployed()
      .then((instance) => instance.solve('bad password', { from: alice }))
      .then((tx) => {
        console.log('TX', tx)

        const afterBalance = web3.eth.getBalance(alice)
        const difference = initBalance.minus(afterBalance).toNumber()

        console.log('INIT', initBalance)
        console.log('AFTER', afterBalance)

        const {
          receipt: { gasUsed },
          logs: [ { event, args } ],
        } = tx

        console.log('GAS USED', gasUsed)
        console.log('EVENT', event)
        console.log('ARGS', args)

        console.log(difference)

        assert.equal(difference, DefaultGasPrice * gasUsed, 'Bounty was transferred')





        done()
      })
  })
})