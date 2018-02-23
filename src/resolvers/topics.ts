import * as glob from "glob";
import * as path from "path";
import { get } from "request-promise-native";
import { SCHEMA_REGISTRY_URL } from "../constants";

/**
 * Requires all json schemas in the kafka/schemas folder.
 * @param args
 */
export const getSchemas = (args): object => {
  const allSchemas = {};
  glob.sync("./src/kafka/schemas/*.json").forEach((file) => {
    const regex = /([a-zA-Z\d]*)(.json$)/g;
    allSchemas[regex.exec(file)[1]] = require( path.resolve( file ) );
  });
  if (args.name) {
    return {
      [`${args.name}`]: allSchemas[args.name].fields,
    };
  }
  return Object.keys(allSchemas).reduce((acc, curr) => {
    return {
      ...acc,
      [`${curr}`]: allSchemas[curr].fields,
    };
  }, {});
};

/**
 * Grab topics from the schema registry on the host machine
 * @param args Arguments from the graphql query
 */
export const getTopics = async (args): Promise<[object]> => {
  let response;
  response = await get({
    uri: SCHEMA_REGISTRY_URL,
  });

  const topics = JSON.parse(response);

  const nameFilter = (topic) => {
    if (!args.name) {
      return true;
    }
    return topic === args.name;
  };

  // TODO: dont call getSchemas twice 💁‍♂️
  const existsFilter = (topic) => {
    return getSchemas(args)[topic];
  };
  return topics.filter(nameFilter).filter(existsFilter).map((topic) => {
    return {
      name: topic,
      schema: {
        fields: getSchemas(args)[topic],
      },
    };
  });
};
