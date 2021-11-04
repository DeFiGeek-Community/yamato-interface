# Yamato Interface

![](https://github.com/DeFiGeek-Community/yamato-interface/workflows/Build%20&%20Test/badge.svg)
[![E2E visiting and wallet connection tests.](https://github.com/DeFiGeek-Community/yamato-interface/actions/workflows/e2e-commit.yaml/badge.svg)](https://github.com/DeFiGeek-Community/yamato-interface/actions/workflows/e2e-commit.yaml)

A user interface for Yamato Protocol.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and was helped a lot by [Uniswap Interface](https://github.com/Uniswap/uniswap-interface).

## Overview

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

## Getting started

```bash
- yarn && yarn start
```

You can view it at `http://localhost:3000`.
That's all!
