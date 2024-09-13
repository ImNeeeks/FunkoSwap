const { Schema, model } = require('mongoose');
const funkoSchema = require('./funko');

const bcyrpt = require('bcrypt');

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
        wishList: [funkoSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.pasword = await bcyrpt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcyrpt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;