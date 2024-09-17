const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = process.env.JWT_SECRET || 'mysecretsshhhhh'; // Use an environment variable for the secret
const expiration = '2h';

module.exports = {
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }
        if (!token) {
            return req;
        }
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }
        return req;
    },
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
