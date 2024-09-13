
const express = require("express");
const { ApolloServer } = require("@apollo/server");
// imports Apollo/server from apollo library
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { typeDefs, resolvers } = require("./schemas");
// importing typeDefs and resolvers from the schema file
const db = require("./config/connection");
const { Funko } = require("./models");


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

  app.use("/graphql", expressMiddleware(server));
  app.get("/test", async (req, res) => {
    const data = await Funko.find();
    const cleaned = data.map((funko) => funko._doc);
    console.log(cleaned);
    res.json(cleaned);
  });
  // if we're in production, serve client/dist as static assets
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
