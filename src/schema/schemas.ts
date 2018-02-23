export const typeDefs = `
  type Query {
    topics(name: String): [Topic]
  }

  type Field { name: String, type: String, doc: String }
  type Schema { fields: [Field] }
  type Topic { name: String, schema: Schema }
`;