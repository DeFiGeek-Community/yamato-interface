/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import * as dotenv from 'dotenv';
dotenv.config();

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  if (process.env.REACT_APP_INFURA_KEY) {
    config.env.REACT_APP_INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
  }

  if (process.env.REACT_APP_DEFAULT_CHAINID) {
    config.env.REACT_APP_DEFAULT_CHAINID =
      process.env.REACT_APP_DEFAULT_CHAINID;
  }

  if (process.env.REACT_APP_ENABLE_SUBGRAPH) {
    config.env.REACT_APP_ENABLE_SUBGRAPH =
      process.env.REACT_APP_ENABLE_SUBGRAPH;
  }

  if (process.env.CYPRESS_BASE_URL) {
    config.baseUrl = process.env.CYPRESS_BASE_URL;
  }

  if (process.env.CYPRESS_WALLET_PRIVATE_KEY) {
    config.env.WALLET_PRIVATE_KEY = process.env.CYPRESS_WALLET_PRIVATE_KEY;
  }

  return config;
};
