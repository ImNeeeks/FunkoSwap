// import "./MyFunkoWishlist.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_WISHLIST } from "../../utils/queries";
// import "./MyFunkoWishlist.css";
import { ADD_FUNKO_TO_CART } from "../../utils/mutations"; // Make sure this is defined
import { useState } from "react";
import { DELETE_FUNKO } from "../../utils/mutations";

function Wishlist() {
  const [messages, setMessages] = useState({});
  const { loading, error, data } = useQuery(GET_WISHLIST);
  const [deleteFunko] = useMutation(DELETE_FUNKO);

  const [AddFunkoToCart] = useMutation(ADD_FUNKO_TO_CART);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const wishlist = data?.getWishlist || [];

  const handleAddToCart = async (funkoId) => {
    try {
      const { data } = await AddFunkoToCart({ variables: { funkoId } });
      console.log("Mutation response:", data); // Log the response
      if (data.AddFunkoToCart) {
        setMessages((prev) => {
          const newMessages = {
            ...prev,
            [data.AddFunkoToCart
              ._id]: `Added ${data.AddFunkoToCart.title} to Cart`,
          };
          console.log("Updated messages:", newMessages); // Log updated messages
          return newMessages;
        });
      } else {
        console.error("No Funko returned from mutation.");
      }
    } catch (e) {
      console.error("Error adding Funko to cart", e);
    }
  };

  const handleDelete = async (funkoId) => {
    try {
      const { data } = await deleteFunko({
        variables: { funkoId, collection: "wishlist" },
      });
      console.log("Funko deleted successfully:", data);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting Funko:", error);
    }
  };

  return (
    <div className="collection-wrapper">
      <h2 className="collection-title">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="row">
          {wishlist.map((funko) => (
            <div key={funko._id} className="col-lg-4 m-3">
              <div className="card align-items-center custom-card">
                <img
                  src={funko.imageName}
                  alt={funko.title}
                  width={150}
                  height={150}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{funko.title}</h5>
                  <p>Price: ${funko.randomexampleprice?.toFixed(2) || "N/A"}</p>

                  {/* Display series */}
                  {funko.series?.length > 0 ? (
                    <p>Series: {funko.series.join(", ")}</p> // Join series array into a string
                  ) : (
                    <p>Series: N/A</p> // Fallback if no series
                  )}
                  <button
                    className="btn btn-danger bg fixed-width-button"
                    style={{ width: "150px" }}
                    onClick={() => handleDelete(funko._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary fixed-width-button"
                    style={{ width: "150px" }}
                    onClick={() => handleAddToCart(funko._id)}
                  >
                    Add to Cart
                  </button>
                  {messages[funko._id] && (
                    <div
                      className={`notification mt-3 animate__animated animate__fadeIn`}
                    >
                      {messages[funko._id]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
