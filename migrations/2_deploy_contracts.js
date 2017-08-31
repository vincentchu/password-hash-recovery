const PasswordHashRecovery = artifacts.require('./PasswordHashRecovery.sol')

module.exports = (deployer) => {
  deployer.deploy(PasswordHashRecovery)
}
