const { Schema, model } = require("mongoose");
const categorySchema = require("./category");
//const {originalDB} = require("../config/connection");

//imageName is the URL to the funko image URL
const funkoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    handle: {
      type: String,
      required: true,
    },
    imageName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    category: [categorySchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// const Funko = originalDB.model("Funko", funkoSchema);
const Funko = model("Funko", funkoSchema);
module.exports = Funko;
