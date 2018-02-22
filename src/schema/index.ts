// TODO:
// Convert avro schema to be graphql schema

// 1. copy and paste schema into resolvers/schemas/
// 2. run generator to append schema to this guy
// 3. done!

// The GraphQL schema in string form
export const typeDefs = `
  type Query { topics(name: String): [Topic] }

  type Field { name: String, type: String, doc: String }
  type Schema { fields: [Field] }
  type Topic { name: String, schema: Schema }

  type Mutation {
    sendMessage(message: String): String
  }
`;
