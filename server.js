const { ApolloServer } = require('apollo-server');
const { sequelize } = require('./models');
const contextMiddleware = require('./utils/contextMiddleware')

require('dotenv').config()

const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: contextMiddleware,
    subscriptions: { path: '/' }
});

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`);
    console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);

    sequelize.authenticate()
        .then(() => console.log('db conn!'))
        .catch((err) => console.log(err))
});