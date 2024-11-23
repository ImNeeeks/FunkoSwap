const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", //this refers to const User in user.js
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  profilePic: {
    type: String,
    required: false,
  },
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
