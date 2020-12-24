const { ApolloServer } = require('apollo-server');
const { sequelize } = require('./models');
const contextMiddleware = require('./utils/contextMiddleware')

const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: contextMiddleware,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);

    sequelize.authenticate()
        .then(() => console.log('db conn!'))
        .catch((err) => console.log(err))
});