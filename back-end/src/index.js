const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Defina o esquema GraphQL
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Defina os resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start(); // Espera o servidor iniciar

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
