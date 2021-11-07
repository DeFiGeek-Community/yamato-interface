# Contributing Guide

## Issue Reporting Guidelines

Please use [a template to open new issue](https://github.com/DeFiGeek-Community/yamato-interface/issues/new/choose). Issues not conforming to the templates may be closed immediately.

## Pull Request Guidelines

1. Be sure that an issue describes the problem you're fixing, or documents the design for the feature you'd like to add.
   Discussing the design upfront helps to ensure that we're ready to accept your work.

2. [Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) the [yamato-interface](https://github.com/DeFiGeek-Community/yamato-interface).

3. In your forked repository, make your changes in a new git branch:

   ```shell
   git checkout -b my-fix-branch main
   ```

4. Create your patch, **including appropriate test cases**.

5. Run the full test suite, as described in [test section](#test) below, and ensure that all tests pass.

6. Commit your changes using a descriptive commit message that follows our [commit message conventions](#Committing Changes).
   Adherence to these conventions is necessary because release notes are automatically generated from these messages.

   ```shell
   git commit --all
   ```

   Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

7. Push your branch to GitHub:

   ```shell
   git push origin my-fix-branch
   ```

8. In GitHub, send a pull request to `yamato-interface:main`.

## Development Setup

### Prerequisite Software

You will need [Node.js](http://nodejs.org) and [yarn](https://yarnpkg.com/en/docs/install).

### Fork and clone the repository

1. [Fork](https://help.github.com/forking) the [yamato-interface](https://github.com/DeFiGeek-Community/yamato-interface).
2. Clone your fork of the repository and define an `upstream` remote pointing back to
   the repository that you forked in the first place.

```bash
# Clone your GitHub repository:
git clone git@github.com:<github username>/yamato-interface.git

# Go to the yamato-interface directory:
cd yamato-interface

# Add the main yamato-interface repository as an upstream remote to your repository:
git remote add upstream https://github.com/DeFiGeek-Community/yamato-interface.git
```

### Install and Build

1. Prepare environment variables. Especially, `REACT_APP_INFURA_KEY` is required.
2. Install dependencies and start.
3. You can view it at `http://localhost:3000`.

```bash
# Prepare environment variables.
cp .env.sample .env.local

# Install dependencies and start.
yarn && yarn start
```

### Committing Changes

Commit messages should follow the [commit message convention](https://www.conventionalcommits.org/).

### Running Tests Locally

The repository uses Jest and Cypress.

#### Jest

Please see [test section ](https://create-react-app.dev/docs/running-tests#command-line-interface)

```bash
yarn test
```

#### Cypress

Please refer to [TEST](doc/TEST.md) and [cypress](https://docs.cypress.io/guides/).

```bash
yarn cypress:open
```

## Project Structure

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
