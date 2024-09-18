
import "./MyFunkoSale.css"; // Corrected import
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_FUNKO } from "../../utils/mutations";
import { GET_CART } from "../../utils/queries";


function Cart() {
  const { loading, error, data } = useQuery(GET_CART);
  const [deleteFunko] = useMutation(DELETE_FUNKO);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;
  
  const cartItems = data?.getCart || [];

  const handleDelete = async (funkoId) => {
    try {
      const { data } = await deleteFunko({ variables: { funkoId, collection: "cart" } });
      console.log("Funko deleted successfully:", data);
      // Optionally, update cache or state to reflect changes
    } catch (error) {
      console.error("Error deleting Funko:", error);
    }
  };
  
    
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
                  {funko.series?.length > 0 ? (
                    <p>Series: {funko.series.join(', ')}</p>
                  ) : (
                    <p>Series: N/A</p>
                  )}
                  <button className="btn btn-danger bg" onClick={() => handleDelete(funko._id)}>
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

export default Cart;
