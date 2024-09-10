const { User, Funko } = require('../models');

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
    Query: {
        getFunko: async (parent, args) => {
            const funko = await Funko.findAll(args);
            return { funko };
      }
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
