import React from "react";
import "./MyFunkoWishlist.css";
import { useQuery } from '@apollo/client';
import { GET_WISHLIST } from '../utils/queries'

// this section houses the user's wishlist of funkos they do not own for others to see
function Wishlist() {
  const { loading, error, data } = useQuery(GET_WISHLIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  return (
    <div>
      <h2>My Wishlist</h2>
      {data.wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {data.wishlist.map((funko) => (
            <li key={funko._id}>
              <strong>{funko.name}</strong>
              <p>{funko.description}</p>
              <p>Price: ${funko.price}</p>
              <p>Seller: {funko.seller}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Wishlist;
