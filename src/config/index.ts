import * as fs from "fs";

const env = process.env.ENVIRONMENT || "development";
const defaultConfig = require("./app.json");
const environmentConfig = require(`./${env}.json`);

/**
 * All configuration files are placed in the ./config directory.
 * The loading structure is as follows:
 *
 * - app.json: Main config file that has shared config across all environments
 * - {environment}.json: Based on the environment running in, this config will
 *                       override and be merged with app.json
 * - {environment}.local.json: Similar to regular {environment}.json, but
 *                        includes additional configs that are only applicable
 *                        to local environment. Will override and be merged
 *                        with config loaded so far.
 */

export let config: { [key: string]: any } = mergeConfigs(
  defaultConfig,
  environmentConfig,
);

if (fs.existsSync(`./config/${env}.local.json`)) {
  const localEnvironmentConfig = require(`./${env}.local.json`);
  config = mergeConfigs(config, localEnvironmentConfig);
}

function mergeConfigs(primaryConfig, secondaryConfig) {
  return { ...primaryConfig, ...secondaryConfig };
}

module.exports.config = config;
