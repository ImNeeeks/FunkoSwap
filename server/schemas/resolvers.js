const { User, Funko } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const FRONTEND_DOMAIN = "http://localhost:3001";


// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
  Query: {

    createCheckoutSession: async () => {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: 'price_1QLvEgP9BtnsSP7QZDFbvfq9',
            quantity: 1
          }
        ],
        mode: 'payment',
       success_url: FRONTEND_DOMAIN + "/Success",
        cancel_url: FRONTEND_DOMAIN + "/Cancel" 
      });
      return JSON.stringify({
        url: session.url
      })
},

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
        const userWithCart = await User.findOne({ _id: context.user._id }).populate("cart");
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

        const collectionItems = userWithMyCollection ? userWithMyCollection.myCollection : [];

        let data = JSON.stringify(collectionItems);
        data = JSON.parse(data);

        return data;
      } catch (error) {
        throw new Error("Error fetching collection");
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
        // Find or create the wishlist for the user
        let userData = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { cart: funkoId } },
          { new: true }
        );
        console.log(userData);
        return userData;
      } catch (error) {
        console.log(error);
        throw new Error("Error adding Funko to wishlist");
      }
    },
    deleteFunko: async (_, { funkoId, collection }, { user }) => {
      if (!user) {
        throw new Error("Not authenticated");
      }
      try {
        let updateQuery;
        switch (collection) {
          case 'wishlist':
            updateQuery = { $pull: { wishList: funkoId } };
            break;
          case 'cart':
            updateQuery = { $pull: { cart: funkoId } };
            break;
          case 'myCollection':
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
    }
  },
};


module.exports = resolvers;
