const { User, Funko } = require("../models");
const { signToken } = require("../utils/auth");

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {

  Query: {
    // getFunko: async (parent, { args }) => {
    //   try {
    //     const funkos = await Funko.find({
    //       handle: { $regex: args, $options: "i" },
    //     });
    //     return funkos;
    //   } catch (error) {
    //     console.error(error);
    //     throw new Error("Failed to fetch funkos");
    //   }
    getFunko: async (parent, args) => {
      console.log("args", args);
      const funko = await Funko.find({ title: args.name });
      console.log("funko", funko);
      return { funko };
    },
    user: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
  },
   Mutation: {
        signUp: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            console.log(user);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user || !user.validatePassword(password)) {
                throw new Error('Invalid credentials');
            }
            const token = signToken(user);
            return { user, token };
        },
        saveFunko: async (parent, args) => {
            return User.findOneAndUpdate(
                { _id: user },
                {
                    $addToSet: { wishList: { args } },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
    },
    deleteFunko: async (parent, args) => {
      return User.findByIdAndUpdate(
        { _id: user },
        { $pull: { wishList: { _id: args } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
