const ConvertLib = artifacts.require('./ConvertLib.sol')
const MetaCoin = artifacts.require('./MetaCoin.sol')

module.exports = (deployer) => {
  deployer.deploy(ConvertLib)
  deployer.link(ConvertLib, MetaCoin)
  deployer.deploy(MetaCoin)
}
