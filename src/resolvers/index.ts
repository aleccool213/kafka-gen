import { get } from "request-promise-native";

const SCHEMA_REGISTRY_URL = "http://localhost:8082/topics";

const getSchemas = (args) => {
  const allSchemas = require("./schemas");

  if (args.name) {
    return {
      [`${args.name}`]: allSchemas.default[args.name].fields,
    };
  }
  return Object.keys(allSchemas.default).reduce((acc, curr) => {
    return {
      ...acc,
      [`${curr}`]: allSchemas.default[curr].fields,
    };
  }, {});
};

const getTopics = async (args) => {
  let response;
  try {
    response = await get({
      uri: SCHEMA_REGISTRY_URL,
    });
  } catch (e) {
    console.log("sad face", e);
  }

  const topics = JSON.parse(response);

  const nameFilter = (topic) => {
    if (!args.name) {
      return true;
    }
    return topic === args.name;
  };
  return topics.filter(nameFilter).map((topic) => {
    return {
      name: topic,
      schema: {
        fields: getSchemas(args)[topic],
      },
    };
  });
};

// The resolvers
export const resolvers = {
  Query: {
    async topics(obj, args, context, info) {

      const topics = await getTopics(args);
      return topics;
    },
  },
};
