const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const { findIndex, propEq, remove, update } = require('ramda');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const AuthPayload = require('./resolvers/AuthPayload');
const Subscription = require('./resolvers/Subscription');
const Feed = require('./resolvers/Feed');

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Subscription,
  Feed
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/billy-le-f81fdb/howtographql/dev',
      secret: 'mysecret123',
      debug: true
    })
  })
});

server.start(() => console.log('Server is running on http:/localhost:4000'));
