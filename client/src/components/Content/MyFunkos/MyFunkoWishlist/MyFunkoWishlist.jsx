import "./MyFunkoWishlist.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_WISHLIST } from "../../utils/queries";
import "./MyFunkoWishlist.css";
// import { ADD_FUNKO_TO_CART } from '../../utils/mutations'; // Make sure this is defined

function Wishlist() {
  const { loading, error, data } = useQuery(GET_WISHLIST);
  // const [addFunkoToCart] = useMutation(ADD_FUNKO_TO_CART, {
  //   onCompleted: () => {
  //     // Optionally, refetch or update the cache to reflect changes immediately
  //   },
  //   onError: (error) => {
  //     console.error("Error adding Funko to cart", error);
  //   }
  // });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const wishlist = data?.getWishlist || [];

  const handleAddToCart = async (funkoId) => {
    try {
      await addFunkoToCart({ variables: { funkoId } });
      // Optionally, refetch or update the cache to reflect changes immediately
    } catch (e) {
      console.error("Error adding Funko to cart", e);
    }
  };

  return (
    <div>
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
                  <p>Price: ${funko.randomexampleprice?.toFixed(2) || 'N/A'}</p>


                  {/* Display series */}
                  {funko.series?.length > 0 ? (
                    <p>Series: {funko.series.join(', ')}</p> // Join series array into a string
                  ) : (
                    <p>Series: N/A</p> // Fallback if no series
                  )}
                  <button
                    className="btn btn-primary fixed-width-button"
                    style={{ width: "150px" }}
                    onClick={() => handleAddToCart(funko._id)}
                  >
                    Add to Cart
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

export default Wishlist;
