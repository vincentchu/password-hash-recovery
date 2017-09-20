const DeployParams = require('../deploy-params.js')

const PasswordHashRecovery = artifacts.require('./PasswordHashRecovery.sol')

module.exports = (deployer) => {
  if (deployer.network === 'development') {
    const params = DeployParams[deployer.network]

    deployer.deploy(
      PasswordHashRecovery,
      params.hash,
      { value: params.bounty }
    )
  } else {
    const contractParams = DeployParams[deployer.network]

    contractParams.forEach((params) => {
      console.log('DEPLOYING', params)
      deployer.deploy(PasswordHashRecovery, params.hash, { value: params.bounty })
    })
  }
}
