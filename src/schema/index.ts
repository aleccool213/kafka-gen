// TODO:
// Convert avro schema to be graphql schema

// 1. copy and paste schema into resolvers/schemas/
// 2. run generator to append schema to this guy
// 3. done!

// The GraphQL schema in string form

import { customDefs } from "./custom";
import { typeDefs } from "./schemas";

export {
  typeDefs,
  customDefs,
};
