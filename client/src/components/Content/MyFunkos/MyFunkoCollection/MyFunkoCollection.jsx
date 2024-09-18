import React from "react";
import "./MyFunkoCollection.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COLLECTION } from "../../utils/queries";

function MyFunkoCollection() {
  const { loading, error, data } = useQuery(GET_COLLECTION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const currentCollection = data?.getMyCollection || [];

  // const handleAddToCart = async (funkoId) => {
  //   // try {
  //   //   await addFunkoToCart({ variables: { funkoId } });
  //   //   // Optionally, refetch or update the cache to reflect changes immediately
  //   // } catch (e) {
  //   //   console.error("Error adding Funko to cart", e);
  //   // }
  // };

  return (
    <div>
      <h2 className="collection-title">My Collection</h2>
      {currentCollection.length === 0 ? (
        <p>Your collection is empty.</p>
      ) : (
        <div className="row">
          {currentCollection.map((funko) => (
            <div key={funko._id} className="col-lg-4 m-3">
              <div className="card align-items-center custom-card">
                <img
                  src={funko.imageName}
                  alt={funko.title}
                  width={150}
                  height={150}
                />
                <div className="card-body">
                  <h5 className="card-title">{funko.title}</h5>
                  <p>Price: ${funko.randomexampleprice?.toFixed(2) || 'N/A'}</p>


                  {/* Display series */}
                  {funko.series?.length > 0 ? (
                    <p>Series: {funko.series.join(', ')}</p> // Join series array into a string
                  ) : (
                    <p>Series: N/A</p> // Fallback if no series
                  )}
                  {/* <button onClick={() => handleAddToCart(funko._id)}>
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

export default MyFunkoCollection;
