const { Schema } = require("mongoose");
const { productDB } = require("../config/connection");

const newFunkoSchema = new Schema({
    title: { type: String, required: true },
    handle: { type: String, required: true },
    imageName: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
});

const NewFunko = productDB.model("NewFunko", newFunkoSchema);
module.exports = NewFunko;






//this belongs in the resolvers

//const Funko = require("../models/Funko"); // Model for Atlas
// const NewFunko = require("../models/NewFunko"); // Model for Local DB

// const resolvers = {
//     Query: {
//         // Fetch Funkos from the original database (Atlas)
//         getOldFunkos: async () => {
//             return await Funko.find();
//         },

//         // Fetch Funkos from the new user-generated database (Local)
//         getUserFunkos: async () => {
//             return await NewFunko.find();
//         },
//     },

//     Mutation: {
//         // Add a new Funko to the local user-generated database
//         addUserFunko: async (_, { title, handle, imageName, description, price }) => {
//             const newFunko = new NewFunko({ title, handle, imageName, description, price });
//             return await newFunko.save();
//         },
//     },
// };

// module.exports = resolvers;
