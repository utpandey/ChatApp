const userResolvers = require('./UserResolver')
const messageResolvers = require('./MessageResolver')

module.exports = {
    Message: {
        createdAt: (parent) => parent.createdAt.toISOString(),
    },
    // User: {
    //     createdAt: (parent) => parent.createdAt.toISOString(),
    // },
    Query: {
        ...userResolvers.Query,
        ...messageResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...messageResolvers.Mutation,
    },
}