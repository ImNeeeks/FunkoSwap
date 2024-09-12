const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = process.env.JWT_SECRET || 'mysecretsshhhhh'; // Use an environment variable for the secret
const expiration = '2h';

module.exports = {
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        try {
            // Generate the token
            return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
        } catch (err) {
            console.error('Error signing token:', err);
            throw new Error('Error signing token');
        }
    },
};
