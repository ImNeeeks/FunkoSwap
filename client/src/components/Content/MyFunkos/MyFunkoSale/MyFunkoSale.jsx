import React from "react";
import "./MyFunkoSale";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CART } from "../../utils/queries"; // Assuming you have a GET_CART query
// import { ADD_FUNKO_TO_CART } from '../../utils/mutations'; // Make sure this mutation is defined

function Cart() {
  const { loading, error, data } = useQuery(GET_CART);
 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const cartItems = data?.getCart || []; // Adjust based on your query

  return (
    <div>
      <h2 className="collection-title">My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          {cartItems.map((funko) => (
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
                  <p>Price: ${funko.randomexampleprice?.toFixed(2) || 'N/A'}</p>


                  {/* Display series */}
                  {funko.series?.length > 0 ? (
                    <p>Series: {funko.series.join(', ')}</p> // Join series array into a string
                  ) : (
                    <p>Series: N/A</p> // Fallback if no series
                  )}
                  {/* <button
                    className="btn btn-primary fixed-width-button"
                    style={{ width: "150px" }}
                    onClick={() => handleAddToCart(funko._id)}
                  >
                    Add to Cart
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;

