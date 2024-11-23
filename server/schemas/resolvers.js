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
        const funkos = await Funko.find({
          title: { $regex: searchTerm, $options: "i" },
        }).limit(maxLimit);
        let data = JSON.stringify(funkos);
        data = JSON.parse(data);

        console.log("funkos:", funkos);

        return data;
      } catch (error) {
        console.error("Error fetching Funkos:", error);
        throw new Error("Failed to fetch Funkos");
      }
    },
    getCart: async (parent, args, context) => {
      // Ensure the user is authenticated
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      try {
        // Fetch the user and populate their cart
        const userWithCart = await User.findOne({
          _id: context.user._id,
        }).populate("cart");
        const cartItems = userWithCart ? userWithCart.cart : []; // Get the cart items or an empty array if none exist

        // Convert the cart items to JSON
        let data = JSON.stringify(cartItems);
        data = JSON.parse(data); // If you need to parse it back, although typically not needed in this context

        return data; // Return the JSON data
      } catch (error) {
        throw new Error("Error fetching cart");
      }
    },

    user: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
    getWishlist: async (parent, args, context) => {
      // Ensure the user is authenticated
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      try {
        // Assuming `User.findOne` will fetch a user and populate their wishlist
        const userWithWishlist = await User.findOne({
          _id: context.user._id,
        }).populate("wishList");
        // Get the wishlist items or an empty array if none exist
        const wishlistItems = userWithWishlist ? userWithWishlist.wishList : [];

        // Convert the wishlist items to JSON
        let data = JSON.stringify(wishlistItems);
        data = JSON.parse(data); // Typically not needed, but included as per your request

        return data;
      } catch (error) {
        throw new Error("Error fetching wishlist");
      }
    },
    getMyCollection: async (parent, args, context) => {
      // Ensure the user is authenticated
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      try {
        // Assuming `User.findOne` will fetch a user and populate their collection
        const userWithMyCollection = await User.findOne({
          _id: context.user._id,
        }).populate("myCollection");

        const collectionItems = userWithMyCollection
          ? userWithMyCollection.myCollection
          : [];

        let data = JSON.stringify(collectionItems);
        data = JSON.parse(data);

        return data;
      } catch (error) {
        throw new Error("Error fetching collection");
      }
    },
    getUserProfile: async (_, { username }, context) => {
      // Ensure the user is authenticated
      if (!context.user) {
        throw new Error("Not authenticated");
      }

      try {
        // Find the user by username
        const user = await User.findOne({ username })
          .populate("myCollection")
          .populate("wishList")
          .populate("cart")
          .populate("profile.forSale");

        if (!user) {
          throw new Error("User not found");
        }

        // Return the user profile details
        return {
          username: user.username,
          bio: user.profile.bio,
          avatar: user.profile.avatar,
          forSale: user.profile.forSale,
          myCollection: user.myCollection,
          wishlist: user.wishList,
        };
      } catch (error) {
        console.error("Error fetching user profile:", error);
        throw new Error("Failed to fetch user profile");
      }
      // getUserProfile: async (_, { username }, context) => {
      //   // Ensure the user is authenticated
      //   if (!context.user) {
      //     throw new Error("Not authenticated");
      //   }

      //   try {
      //     // Assuming `User.findOne` will fetch a user and populate their collection
      //     const userWithProfile = await User.findOne({
      //       _id: context.user._id,
      //     }).populate("myProfile");

      //     const profileItems = userWithProfile ? userWithProfile.myProfile : [];

      //     let data = JSON.stringify(profileItems);
      //     data = JSON.parse(data);

      //     return data;
      //   } catch (error) {
      //     throw new Error("Error fetching collection");
      //   }
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
        throw new Error("Invalid credentials");
      }
      const token = signToken(user);
      return { user, token };
    },

    // wishlist error might be here its wither WishList/wishList
    addFunkoToWishlist: async (_, { funkoId }, { user }) => {
      if (!user) {
        throw new Error("Not authenticated");
      }

      try {
        // Find or create the wishlist for the user
        let userData = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { wishList: funkoId } },
          { new: true }
        );
        console.log(userData);
        return userData;
      } catch (error) {
        console.log(error);
        throw new Error("Error adding Funko to wishlist");
      }
    },
    addFunkoToMyCollection: async (_, { funkoId }, { user }) => {
      if (!user) {
        throw new Error("Not authenticated");
      }

      try {
        // Find or create the wishlist for the user
        let userData = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { myCollection: funkoId } },
          { new: true }
        );
        console.log(userData);
        return userData;
      } catch (error) {
        console.log(error);
        throw new Error("Error adding Funko to collection");
      }
    },
    AddFunkoToCart: async (_, { funkoId }, { user }) => {
      if (!user) {
        throw new Error("Not authenticated");
      }

      try {
        // Find or create the cart for the user
        let userData = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { cart: funkoId } },
          { new: true }
        );
        console.log(userData);
        return userData;
      } catch (error) {
        console.log(error);
        throw new Error("Error adding Funko to cart");
      }
    },
    deleteFunko: async (_, { funkoId, collection }, { user }) => {
      if (!user) {
        throw new Error("Not authenticated");
      }
      try {
        let updateQuery;
        switch (collection) {
          case "wishlist":
            updateQuery = { $pull: { wishList: funkoId } };
            break;
          case "cart":
            updateQuery = { $pull: { cart: funkoId } };
            break;
          case "myCollection":
            updateQuery = { $pull: { myCollection: funkoId } };
            break;
          default:
            throw new Error("Invalid collection specified");
        }
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          updateQuery,
          { new: true }
        );
        return updatedUser;
      } catch (error) {
        throw new Error("Error deleting Funko");
      }
    },
    addFunkoForSale: async (_, { funkoId, price }, { user }) => {
      if (!user) {
        throw new Error("Not authenticated");
      }

      try {
        // Find the user and update their forSale list
        const funkoForSale = { funkoId, price };
        const updatedProfile = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { "profile.forSale": funkoForSale } },
          { new: true }
        ).populate("profile.forSale");

        if (!updatedProfile) {
          throw new Error("Profile not found for this user");
        }

        // Return the profile with the updated forSale list
        return updatedProfile.profile;
      } catch (error) {
        console.error("Error adding Funko to forSale:", error);
        throw new Error("Failed to add Funko for sale");
      }
    },
  },
};

module.exports = resolvers;
