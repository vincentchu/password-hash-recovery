const PasswordHashRecovery = artifacts.require('./PasswordHashRecovery.sol')

module.exports = (deployer) => {
  deployer.deploy(
    PasswordHashRecovery,
    '0xa9993e364706816aba3e25717850c26c9cd0d89d',
    { value: '218000000000' }
  )
}
