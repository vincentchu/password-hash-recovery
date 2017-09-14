const DeployParams = require('../deploy-params.js')

const PasswordHashRecovery = artifacts.require('./PasswordHashRecovery.sol')

module.exports = (deployer) => {
  const params = DeployParams[deployer.network]

  deployer.deploy(
    PasswordHashRecovery,
    params.hash,
    { value: params.bounty }
  )
}
