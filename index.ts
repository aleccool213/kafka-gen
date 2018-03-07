// @flow

const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { typeDefs, customDefs } = require("./src/schema");
const { resolvers } = require("./src/resolvers");

// Put together a schema
const schema = makeExecutableSchema({
  resolvers,
  typeDefs: customDefs.length > 0 ? customDefs : typeDefs,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Start the server
app.listen(3001, () => {
  console.log("Go to http://localhost:3001/graphiql to run queries!");
});
