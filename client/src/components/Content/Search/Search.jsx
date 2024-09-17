/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useMutation, gql, useLazyQuery } from "@apollo/client";
import "./Search.css";
import { ADD_FUNKO_TO_WISHLIST } from "../utils/mutations";
import { SEARCH_FUNKOS } from "../utils/queries";


const ADD_FUNKO_TO_COLLECTION = gql`
    mutation AddFunkoToCollection($funkoId: ID!) {
        addFunkoToCollection(funkoId: $funkoId) {
            _id
            title
        }
    }
`;



const ADD_FUNKO_TO_SALE = gql`
    mutation AddFunkoToSale($funkoId: ID!) {
        addFunkoToSale(funkoId: $funkoId) {
            _id
            title
        }
    }
`;

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [limit, setLimit] = useState(10);

  const [fetchFunkos, { called, loading, data, error }] = useLazyQuery(SEARCH_FUNKOS, {
    variables: { searchTerm, limit },
    skip: !searchTerm, // Skip query execution if searchTerm is empty
    onCompleted: (data) => {
      setSearchResults(data.getFunko || []);
    },
    onError: (error) => {
      console.error("error fetching Funkos", error);
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
        fetchFunkos();
    };

  const handleAddFunko = async (funko, destination) => {
    try {
      switch (destination) {
        case "MyCollection":
          await addFunkoToCollection({ variables: { funkoId: funko._id } });
          console.log(`Added ${funko.title} to MyFunkoCollection`);
          break;
        case "MyWishlist":
          await addFunkoToWishlist({ variables: { funkoId: funko._id } });
          console.log(`Added ${funko.title} to MyFunkoWishlist`);
          break;
        case "MySale":
          await addFunkoToSale({ variables: { funkoId: funko._id } });
          console.log(`Added ${funko.title} to MyFunkoSale`);
          break;
        default:
          console.error("Invalid destination");
      }
    } catch (error) {
      console.error("Error adding Funko:", error);
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <h2>Search for Funkos</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Search Funkos"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        {/* new results page option */}
         <div className="pagination-controls">
          <label>
            Results per page:
            <select value={limit} onChange={(e) => setLimit(parseInt(e.target.value))}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>
          </label>
        </div>
      </div>

            <div className="search-results">
                <h3>Results:</h3>
                {searchResults.length === 0 ? (
                    <p>No results found</p>
                ) : (
                    <div className="row">
                        {searchResults.map((funko) => (
                            <div key={funko._id} className="col-lg-2">
                                <div
                                    className="card"
                                    style={{
                                        width: "18rem",
                                        height: "30rem",
                                        margin: "10px",
                                    }}
                                >
                                    <img
                                        src={funko.imageName}
                                        width="200"
                                        height="200"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Card title
                                        </h5>
                                        <p className="card-text">
                                            Some quick example text to build on
                                            the card title and make up the bulk
                                            of the card's content.
                                        </p>
                                        <a href="#" className="btn btn-primary">
                                            Go somewhere
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;

///
