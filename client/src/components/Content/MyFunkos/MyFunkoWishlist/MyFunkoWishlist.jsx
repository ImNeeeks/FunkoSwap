import React from "react";
import "./MyFunkoWishlist.css";
import { useQuery, useMutation } from '@apollo/client';
import { GET_WISHLIST } from '../../utils/queries';
import { ADD_FUNKO_TO_WISHLIST } from '../../utils/mutations';

function Wishlist() {
  const { loading, error, data } = useQuery(GET_WISHLIST);
  const [addFunkoToWishlist] = useMutation(ADD_FUNKO_TO_WISHLIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const handleAddToWishlist = async (funkoId) => {
    try {
      await addFunkoToWishlist({ variables: { funkoId } });
      // Optionally, refetch or update the cache to reflect changes immediately
    } catch (e) {
      console.error("Error adding Funko to wishlist", e);
    }
  };

  return (
    <div>
      <h2>My Wishlist</h2>
      {data.wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {data.wishlist.map((funko) => (
            <li key={funko._id}>
              <strong>{funko.title}</strong>
              <p>{funko.description}</p>
              <p>Price: ${funko.price}</p>
              <p>Seller: {funko.seller}</p>
              <button onClick={() => handleAddToWishlist(funko._id)}>Add to Wishlist</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Wishlist;

