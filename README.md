# Yamato Interface

[![Buid & Test](https://circleci.com/gh/DeFiGeek-Community/yamato-interface.svg?style=svg)](https://circleci.com/gh/DeFiGeek-Community/yamato-interface)
[![E2E visiting and wallet connection tests.](https://github.com/DeFiGeek-Community/yamato-interface/actions/workflows/e2e-commit.yaml/badge.svg)](https://github.com/DeFiGeek-Community/yamato-interface/actions/workflows/e2e-commit.yaml)
[![codecov](https://codecov.io/gh/DeFiGeek-Community/yamato-interface/branch/main/graph/badge.svg)](https://codecov.io/gh/DeFiGeek-Community/yamato-interface)

A user interface for Yamato Protocol.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and was helped a lot by [Uniswap Interface](https://github.com/Uniswap/uniswap-interface).

## Quick overview

- This repository consists of three main functions.
  1. react components
  1. react hooks
  1. redux
- Ethereum part is mostly handled by ethers.js and web3-react.
  - [ethers.js](https://docs.ethers.io/v5/) deals with ethereum-node-api in general.
  - [web3-react](https://github.com/NoahZinsmeister/web3-react) is responsible for the Wallet.
  - [The Graph](https://thegraph.com/) communicates the data.
- The mapping of directories/files in `/src` is below:

![Top directories mapping](/doc/images/overview_architecture.png)

## Questions

For questions and support please use [community chat](https://discord.com/invite/FQYXqVBEnh) or the [official forum](https://gov.defigeek.xyz/).

## Contribution

For steps on local development and code contribution, please see the [contributing guide](./CONTRIBUTING.md).

Thank you to all the people who already contributed!

<a href="https://github.com/DeFiGeek-Community/yamato-interface/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=DeFiGeek-Community/yamato-interface" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

## License

[GPL-3.0 License](https://opensource.org/licenses/GPL-3.0)
