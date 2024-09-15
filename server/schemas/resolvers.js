
const { User, Funko, wishList } = require('../models');
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
    // getFunko: async (parent, args) => {
    //   console.log("args", args);
    //   const funko = await Funko.find({ title: args.name });
    //   console.log("funko", funko);
    //   return funko;
    // },
    getFunko: async (parent, args) => {
      console.log("args", args);
      try {
        
        const searchTerm = args.searchTerm; 
        console.log(args);
        const funkos = await Funko.find({ title: { $regex: searchTerm, $options: 'i' } });

        console.log("funko", funkos); 

        return funkos;
      } catch (error) {
        console.error("Error fetching Funkos:", error);
        throw new Error('Failed to fetch Funkos');
      }
    },
    user: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
    getWishlist: async (_, __, { user }) => {
      // Ensure the user is authenticated
      if (!user) {
        throw new Error('Not authenticated');
      }

      try {
        const wishList = await wishList.findOne({ user: user.id }).populate('funkos');
        return wishList ? wishList.funkos : [];
      } catch (error) {
        throw new Error('Error fetching wishlist');
      }
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

    // wishlist error might be here its wither WishList/wishList
    addFunkoToWishlist: async (_, { funkoId }, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }

      try {
        // Find or create the wishlist for the user
        let wishlist = await wishList.findOne({ user: user.id });
        if (!wishlist) {
          wishlist = new Wishlist({ user: user.id, funkos: [] });
        }

        // Add the Funko to the wishlist if not already present
        if (!wishlist.funkos.includes(funkoId)) {
          wishlist.funkos.push(funkoId);
          await wishlist.save();
        }

        return await Funko.findById(funkoId);
      } catch (error) {
        throw new Error('Error adding Funko to wishlist');
      }
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
