# Contributing Guide

## Issue Reporting Guidelines

Please use [a template to open new issue](https://github.com/DeFiGeek-Community/yamato-interface/issues/new/choose). Issues not conforming to the templates may be closed immediately.

## Pull Request Guidelines

### Discover issues

If you're ready to tackle some open issues, we've collected [some good first issues](https://github.com/DeFiGeek-Community/yamato-interface/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) for you. And issues labeled like `v1`, `v2`, and `vX`...which indicate the release target has decided to implement.

### Flow to pull request

1. Set up local copy, as described in [development section](#fork-and-clone-the-repository) below.

2. In your forked repository, make your changes in a new git branch:

   ```shell
   git checkout -b my-fix-branch main
   ```

3. Create your patch, **including appropriate test cases**.

4. Run the `yarn lint --fix && yarn format` command.

4. Run the full test suite, as described in [test section](#running-tests-locally) below, and ensure that all tests pass.

5. Commit your changes using a descriptive commit message that follows our [commit message conventions](#committing-changes).

   ```shell
   git commit --all
   ```

   Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

6. Push your branch to GitHub:

   ```shell
   git push origin my-fix-branch
   ```

7. In GitHub, send a pull request to `yamato-interface:main`.

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
