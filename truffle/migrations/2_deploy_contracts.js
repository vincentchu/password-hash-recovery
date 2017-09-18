const DeployParams = require('../deploy-params.js')

const PasswordHashRecovery = artifacts.require('./PasswordHashRecovery.sol')

module.exports = (deployer, network) => {
  console.log('NET', network)
  if (deployer.network === 'development') {
    const params = DeployParams[deployer.network]

    deployer.deploy(
      PasswordHashRecovery,
      params.hash,
      { value: params.bounty }
    )
  } else {
    console.log('>>', deployer.network)
    const contractParams = DeployParams[deployer.network]
    console.log('CONT', contractParams)

    contractParams.forEach((params) => {
      console.log('DEPLOYING', params)
      deployer.deploy(PasswordHashRecovery, params.hash, { value: params.bounty })
    })
  }
}
