
const { Schema, model } = require("mongoose");


const WishlistSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    funkos: [{ type: Schema.Types.ObjectId, ref: 'Funko' }]
});

const wishList = model('Wishlist', WishlistSchema);

module.exports = wishList;