const DeployParams = require('../deploy-params.js').development

const PasswordHashRecovery = artifacts.require('./PasswordHashRecovery.sol')

const DefaultGasPrice = web3.toBigNumber('100000000000')

contract('PasswordHashRecovery', (accounts) => {
  it('should initialize the contract', (done) => {
    PasswordHashRecovery.deployed()
      .then((instance) => instance.bounty())
      .then((bounty) => {
        assert.equal(bounty.valueOf(), DeployParams.bounty, 'Bounty was of wrong size')
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
      .then((instance) => instance.solve.call(DeployParams.plaintext, { from: alice }))
      .then((status) => {
        assert.ok(status, 'Correct password was not successful')

        done()
      })
  })

  it('should not transfer bounty and emit AttemptFailed event if solve was unsuccessful', (done) => {
    const alice = accounts[0]
    const initBalance = web3.eth.getBalance(alice)

    PasswordHashRecovery.deployed()
      .then((instance) => instance.solve('bad password', { from: alice }))
      .then((tx) => {
        const {
          receipt: { gasUsed },
          logs,
        } = tx

        const [ { event, args } ] = logs

        const afterBalance = web3.eth.getBalance(alice)
        const difference = initBalance.minus(afterBalance).valueOf()
        const gasCost = DefaultGasPrice.times(gasUsed).valueOf()

        assert.equal(difference, gasCost, 'Bounty was transferred')
        assert.equal(logs.length, 1, 'Too many events emitted')
        assert.equal(event, 'AttemptFailed', 'Wrong event type emitted')
        assert.equal(args.password, 'bad password', 'Wrong password emitted')

        done()
      })
  })

  it('should reward success solve attempts', (done) => {
    const bob = accounts[1]
    const initialBalance = web3.eth.getBalance(bob)

    PasswordHashRecovery.deployed()
      .then((instance) => instance.solve('abc', { from: bob }))
      .then((tx) => {
        const {
          receipt: { gasUsed },
          logs,
        } = tx

        const [ { event, args } ] = logs
        const afterBalance = web3.eth.getBalance(bob)
        const difference = afterBalance.minus(initialBalance).valueOf()

        const gasCost = DefaultGasPrice.times(gasUsed)
        const bountyLessGasCost = web3.toBigNumber(DeployParams.bounty)
          .minus(gasCost)
          .valueOf()

        assert.equal(difference, bountyLessGasCost, 'Bounty not transferred')
        assert.equal(logs.length, 1, 'Too many events emitted')
        assert.equal(event, 'PasswordCracked', 'Wrong event type emitted')
        assert.equal(args.password, 'abc', 'Wrong password emitted')

        done()
      })
  })
})