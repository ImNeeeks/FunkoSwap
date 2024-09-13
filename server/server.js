const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Initialize cookie-parser middleware
    app.use(cookieParser());

    // Initialize session middleware (if using sessions)
    app.use(session({
        secret: 'your-secret-key', // Replace with your own secret
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Set to true if using HTTPS
    }));

    app.use('/graphql', expressMiddleware(server));

    // If we're in production, serve client/dist as static assets
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    });
};

startApolloServer();
