const { Schema } = require('mongoose');
const categorySchema = require('./category');

const funkoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    seller: {
        type: String,
        required: true,
    },
    category: [categorySchema],
},
    {
        toJSON: {
            virtuals: true,
        },
    }
);

module.exports = funkoSchema;