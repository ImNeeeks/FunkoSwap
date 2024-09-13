// App is the central react page that contains the three components, header, footer, and content of our page
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// Header defines the top area that includes the nav bar
import Header from "./components/Header/Header";

// Footer is the bottom area of the page
import Footer from "./components/Footer/Footer";
// import { useState } from "react";

// outlet determines which component displays in content section
import { Outlet } from "react-router-dom";

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


function App() {
  // defines state and uses function setCurrentPage
  return (
    <ApolloProvider client={client}>
      <Header />
      <Outlet />
      <Footer />
    </ApolloProvider>
  );
}

export default App;
