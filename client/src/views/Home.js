// @flow
import React from 'react'
import Contract from './Contract'

const TestContract = {
  title: 'Easy Difficulty',
  panelStyle: 'warning',
  contractAddress: '0x9ad463357ddd5fea6b0150a9948a4fc447c07346',
  passwordSha1Hash: '0xa9993e364706816aba3e25717850c26c9cd0d89d',
}

const DeployedContracts = [0, 1, 2].map(() => TestContract)

const Home = () => (
  <div>
    <div className="page-header">
      <h1>Smart Contracts for Cracking Passwords</h1>
    </div>

    <div className="row">
      <div className="col-md-12">
        <p className="lead">
          Smart contracts can do a lot of things.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </div>
    </div>

    <div>
      <h2>Deployed Contracts</h2>
    </div>

    <div className="row">
      { DeployedContracts.map((contractProps, i) => (
        <div className="col-md-4">
          <Contract key={i} {...contractProps} />
        </div>
      )) }
    </div>
  </div>
)

export default Home