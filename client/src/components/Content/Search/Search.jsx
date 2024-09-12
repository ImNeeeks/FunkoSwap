import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import "./Search.css";

// Define GraphQL queries and mutations
const SEARCH_FUNKOS = gql`
  query SearchFunkos($searchTerm: String!) {
    getFunko(name: $searchTerm) {
      _id
      name
      description
      price
      seller
    }
  }
`;

const ADD_FUNKO_TO_COLLECTION = gql`
  mutation AddFunkoToCollection($funkoId: ID!) {
    addFunkoToCollection(funkoId: $funkoId) {
      _id
      name
    }
  }
`;

const ADD_FUNKO_TO_WISHLIST = gql`
  mutation AddFunkoToWishlist($funkoId: ID!) {
    addFunkoToWishlist(funkoId: $funkoId) {
      _id
      name
    }
  }
`;

const ADD_FUNKO_TO_SALE = gql`
  mutation AddFunkoToSale($funkoId: ID!) {
    addFunkoToSale(funkoId: $funkoId) {
      _id
      name
    }
  }
`;

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Use the useQuery hook to fetch data from the GraphQL server
  const { refetch } = useQuery(SEARCH_FUNKOS, {
    variables: { searchTerm },
    skip: !searchTerm, // Skip query execution if searchTerm is empty
    onCompleted: (data) => {
      setSearchResults(data.getFunko || []);
    },
  });

  const [addFunkoToCollection] = useMutation(ADD_FUNKO_TO_COLLECTION);
  const [addFunkoToWishlist] = useMutation(ADD_FUNKO_TO_WISHLIST);
  const [addFunkoToSale] = useMutation(ADD_FUNKO_TO_SALE);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    refetch(); // Trigger the search
  };

  const handleAddFunko = async (funko, destination) => {
    try {
      switch (destination) {
        case "MyCollection":
          await addFunkoToCollection({ variables: { funkoId: funko._id } });
          console.log(`Added ${funko.name} to MyFunkoCollection`);
          break;
        case "MyWishlist":
          await addFunkoToWishlist({ variables: { funkoId: funko._id } });
          console.log(`Added ${funko.name} to MyFunkoWishlist`);
          break;
        case "MySale":
          await addFunkoToSale({ variables: { funkoId: funko._id } });
          console.log(`Added ${funko.name} to MyFunkoSale`);
          break;
        default:
          console.error("Invalid destination");
      }
    } catch (error) {
      console.error("Error adding Funko:", error);
    }
  };

  return (
    <div>
      <h2>Search for Funkos</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Search Funkos"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        <h3>Results:</h3>
        {searchResults.length === 0 ? (
          <p>No results found</p>
        ) : (
          <ul>
            {searchResults.map((funko) => (
              <li key={funko._id}>
                <div>
                  <strong>{funko.name}</strong>
                  <button onClick={() => handleAddFunko(funko, "MyCollection")}>
                    Add to Collection
                  </button>
                  <button onClick={() => handleAddFunko(funko, "MyWishlist")}>
                    Add to Wishlist
                  </button>
                  <button onClick={() => handleAddFunko(funko, "MySale")}>
                    Add to Sale
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;
