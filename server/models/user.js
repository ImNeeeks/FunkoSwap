const { Schema, model, SchemaType } = require("mongoose");
const funkoSchema = require("./funko");

const bcyrpt = require("bcrypt");

const userSchema = new Schema(

    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
    
    collection: [
      {
        type: Schema.Types.ObjectId,
        ref: "Funko",
      },
    ],
    wishList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Funko",
      },
    ],
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "Funko",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcyrpt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcyrpt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
