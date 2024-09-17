// App is the central react page that contains the three components, header, footer, and content of our page
import "./App.css";
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

// Header defines the top area that includes the nav bar
import Header from "./components/Header/Header";

// Footer is the bottom area of the page
import Footer from "./components/Footer/Footer";
// import { useState } from "react";

// outlet determines which component displays in content section
import { Outlet } from "react-router-dom";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
    uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("id_token");
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    // defines state and uses function setCurrentPage
    return (
        <ApolloProvider client={client}>
            <div className="d-flex flex-column justify-content-between vh-100">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </ApolloProvider>
    );
}

export default App;
