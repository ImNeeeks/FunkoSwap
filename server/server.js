require('dotenv').config();
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { Funko } = require("./models");
const { authMiddleware } = require('./utils/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use environment variable for the secret key

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

  // GraphQL middleware
  app.use("/graphql", expressMiddleware(server, {
    context: authMiddleware
  }));

  // Payment intent route
  app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body; // Expect amount from client
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types: ['card'],
      });
      res.status(200).json(paymentIntent);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Example test route
  app.get("/test", async (req, res) => {
    const data = await Funko.find();
    const cleaned = data.map((funko) => funko._doc);
    console.log(cleaned);
    res.json(cleaned);
  });

  // Serve static assets if in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
