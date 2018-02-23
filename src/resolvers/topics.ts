import { SCHEMA_REGISTRY_URL } from "../constants";

export const getSchemas = (args) => {
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

export const getTopics = async (args) => {
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
