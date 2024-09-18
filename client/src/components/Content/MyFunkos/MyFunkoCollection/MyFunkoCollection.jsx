import React from "react";
import "./MyFunkoCollection.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COLLECTION } from "../../utils/queries";
import { DELETE_FUNKO } from "../../utils/mutations";


function MyFunkoCollection() {
  const { loading, error, data } = useQuery(GET_COLLECTION);
  const [deleteFunko] = useMutation(DELETE_FUNKO);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const currentCollection = data?.getMyCollection || [];

  
  const handleDelete = async (funkoId) => {
    try {
      const { data } = await deleteFunko({ variables: { funkoId, collection: "myCollection" } });
      console.log("Funko deleted successfully:", data);
      // Optionally, update cache or state to reflect changes
    } catch (error) {
      console.error("Error deleting Funko:", error);
    }
  };

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
                  <button
                    className="btn btn-danger bg fixed-width-button"
                    style={{ width: "150px" }}
                    onClick={() => handleDelete(funko._id)}>
                    Delete
                  </button>
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
