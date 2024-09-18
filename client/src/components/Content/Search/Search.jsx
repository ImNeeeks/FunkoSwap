/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useMutation, gql, useLazyQuery } from "@apollo/client";
import "./Search.css";
import { ADD_FUNKO_TO_WISHLIST } from "../utils/mutations";
import { ADD_FUNKO_TO_MYCOLLECTION } from "../utils/mutations";
import { SEARCH_FUNKOS } from "../utils/queries";
import { ADD_FUNKO_TO_CART } from "../utils/mutations";

// const ADD_FUNKO_TO_SALE = gql`
//   mutation AddFunkoToSale($funkoId: ID!) {
//     addFunkoToSale(funkoId: $funkoId) {
//       _id
//       title
//     }
//   }
// `;

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [limit, setLimit] = useState(10);
  const [messages, setMessages] = useState({});

  const [fetchFunkos, { called, loading, data, error }] = useLazyQuery(
    SEARCH_FUNKOS,
    {
      fetchPolicy:"no-cache",
      variables: { searchTerm, limit },
      skip: !searchTerm, // Skip query execution if searchTerm is empty
      onCompleted: (data) => {
        setSearchResults(data.getFunko || []);
      },
      onError: (error) => {
        console.error("error fetching Funkos", error);
      },
    }
  );

  const [addFunkoToMyCollection] = useMutation(ADD_FUNKO_TO_MYCOLLECTION);
  const [addFunkoToWishlist] = useMutation(ADD_FUNKO_TO_WISHLIST);
  const [AddFunkoToCart] = useMutation(ADD_FUNKO_TO_CART);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchFunkos();
    console.log(searchResults);
  };

  const handleAddFunko = async (funko, destination, collection) => {
    try {
      switch (destination) {
        case "MyCollection":
          await addFunkoToMyCollection({ variables: { funkoId: funko._id } });
          setMessages(prev => ({ ...prev, [funko._id]: `Added ${funko.title} to collection` }));
          console.log(`Added ${funko.title} to MyFunkoCollection`);
          break;
        case "MyWishlist":
          await addFunkoToWishlist({ variables: { funkoId: funko._id } });
          setMessages(prev => ({ ...prev, [funko._id]: `Added ${funko.title} to wishlist` }));
          console.log(`Added ${funko.title} to MyFunkoWishlist`);
          break;
        case "MySale":
          await AddFunkoToCart({ variables: { funkoId: funko._id } });
          setMessages(prev => ({ ...prev, [funko._id]: `Added ${funko.title} to cart` }));
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
            <select
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
            >
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
          <div className="row ">
            {searchResults.map((funko) => (
              <div key={funko._id} className="col-lg-4  m-3">
                <div className="card align-items-center">
                  <img
                    src={funko.imageName}
                    alt={funko.title}
                    width={150}
                    height={150}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{funko.title}</h5>
                    {/* <strong>{funko.title}</strong> */}
                    <p>Price: ${funko.randomexampleprice?.toFixed(2) || 'N/A'}</p>


                    {/* Display series */}
                    {funko.series?.length > 0 ? (
                      <p>Series: {funko.series.join(', ')}</p> // Join series array into a string
                    ) : (
                      <p>Series: N/A</p> // Fallback if no series
                    )}
                    <button
                      onClick={() => handleAddFunko(funko, "MyCollection")}
                    >
                      Add to Collection
                    </button>
                    <button onClick={() => handleAddFunko(funko, "MyWishlist")}>
                      Add to Wishlist
                    </button>
                    <button onClick={() => handleAddFunko(funko, "MySale")}>
                      Add to Sale
                    </button>
                    {messages[funko._id] && (
                      <div className={`notification mt-3 animate__animated animate__fadeIn`}>
                        {messages[funko._id]}
                      </div>
                    )}


                    {/* <a href="#" className="btn btn-primary">
                                            Go somewhere
                                        </a> */}
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
