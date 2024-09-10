const { User } = require('../models');

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
    Query: {
        // classes: async () => {
        //     // Get and return all documents from the classes collection
        //     return await Class.find({});
        // }
    },
    Mutation: {
        signUp: async (parent, args) => {
            const user = await User.create(args);
            console.log(user);
            const token = signToken(user);
            return { user, token };
        }
    }
};

module.exports = resolvers;
