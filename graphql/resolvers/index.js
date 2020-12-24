const userResolvers = require('./UserResolver')
const messageResolvers = require('./MessageResolver')

const { Message, User } = require('../../models');

module.exports = {
    Message: {
        createdAt: (parent) => parent.createdAt.toISOString(),
    },
    User: {
        createdAt: (parent) => parent.createdAt.toISOString(),
    },
    Query: {
        ...userResolvers.Query,
        ...messageResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...messageResolvers.Mutation,
    },
    Subscription: {
        ...messageResolvers.Subscription,
    },
}