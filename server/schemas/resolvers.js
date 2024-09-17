const { User, Funko, wishList } = require("../models");
const { signToken } = require("../utils/auth");

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {

  Query: {
   
    getFunko: async (parent, { searchTerm, limit }) => {
      console.log("searchTerm:", searchTerm);
      console.log("limit:", limit);
      try {
        // Set a default limit if not provided
        const maxLimit = limit || 20; // Default to 20 if no limit is specified
        const funkos = await Funko.find({ title: { $regex: searchTerm, $options: 'i' } })
          .limit(maxLimit);

        console.log("funkos:", funkos);

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
    getWishlist: async (parent, args, context) => {
      console.log(context.user);
      // Ensure the user is authenticated
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      try {
        // Assuming `User.findOne` will fetch a user and populate their wishlist
        const userWithWishlist = await User.findOne({ _id: context.user._id }).populate('wishList');
        return userWithWishlist ? userWithWishlist.wishList : [];
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
      if (!user || !user.isCorrectPassword(password)) {
        throw new Error('Invalid credentials');
      }
      const token = signToken(user);
      return { user, token };
    },

    // wishlist error might be here its wither WishList/wishList
    addFunkoToWishlist: async (_, {funkoId} , {user} ) => {
      if (!user) {
        throw new Error('Not authenticated');
      }

      try {
        // Find or create the wishlist for the user
        let userData = await User.findOneAndUpdate({ _id: user._id },{$addToSet:{wishList: funkoId}},{new:true});
        console.log(userData);
        return userData;
      } catch (error) {
        console.log(error);
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
