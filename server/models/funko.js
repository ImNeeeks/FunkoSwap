const { schema, model } = require('mongoose');


const funkoSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
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
});

const Funko = model('Funko', funkoSchema);

module.exports = Funko;