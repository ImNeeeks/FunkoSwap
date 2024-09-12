const { Schema } = require('mongoose');


const categorySchema = new Schema(
    {
        categoryName: {
            type: String
        },
    }
);

module.exports = categorySchema;