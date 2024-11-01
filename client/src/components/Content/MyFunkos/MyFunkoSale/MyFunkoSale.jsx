import "./MyFunkoSale.css";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_FUNKO } from "../../utils/mutations";
import { GET_CART } from "../../utils/queries";

// to use stack feature in cart, import from bootstrap react
import Stack from "react-bootstrap/Stack";

// Cart serves to pull data from the array within the user model
function Cart() {
  const { loading, error, data } = useQuery(GET_CART);
  const [deleteFunko] = useMutation(DELETE_FUNKO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  // this fetches data from query GET_CART
  const cartItems = data?.getCart || [];

  // this will generate the total we want to place on the right third of the page
  const total = cartItems
    .reduce((sum, funko) => sum + (funko.randomexampleprice || 0), 0)
    .toFixed(2);

  // delete function to remove funko off the page
  const handleDelete = async (funkoId) => {
    try {
      const { data } = await deleteFunko({
        variables: { funkoId, collection: "cart" },
      });

      console.log("Funko deleted successfully:", data);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting Funko:", error);
    }
  };

  // renders funko cards, prices, buttons
  return (
    <div className="cart-layout">
      {/* Vertical Title */}
      <div className="vertical-title-container d-flex align-items-center">
        <div className="vertical-title">
          M<br />Y<br />
          <br />C<br />A<br />R<br />T
        </div>
      </div>

      {/* Funko Cards Section */}
      <div className="cart-funkos-section">
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
                    <p>
                      Price: ${funko.randomexampleprice?.toFixed(2) || "N/A"}
                    </p>
                    <button
                      className="btn btn-danger fixed-width-button"
                      onClick={() => handleDelete(funko._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary and Total Section */}
      <div className="cart-summary-section">
        <h3 className="summary font-weight-bold">Order Summary</h3>
        <Stack gap={2} className="summary-list">
          {cartItems.map((funko) => (
            <div
              key={funko._id}
              className="d-flex justify-content-between align-items-center list-group-item"
            >
              <span>{funko.title}</span>
              <span className="text-muted">
                ${funko.randomexampleprice?.toFixed(2) || "N/A"}
              </span>
            </div>
          ))}
        </Stack>
        <div className="total-section">
          <strong>Total: ${total}</strong>
        </div>
      </div>
    </div>
  );
}

//     <div className="collection-wrapper">
//       <h2 className="collection-title">My Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div className="row">
//           {cartItems.map((funko) => (
//             <div key={funko._id} className="col-lg-4 m-3">
//               <div className="card align-items-center custom-card">
//                 <img
//                   src={funko.imageName}
//                   alt={funko.title}
//                   width={150}
//                   height={150}
//                 />
//                 <div className="card-body text-center">
//                   <h5 className="card-title">{funko.title}</h5>
//                   <p>Price: ${funko.randomexampleprice?.toFixed(2) || "N/A"}</p>
//                   {funko.series?.length > 0 ? (
//                     <p>Series: {funko.series.join(", ")}</p>
//                   ) : (
//                     <p>Series: N/A</p>
//                   )}
//                   <button
//                     className="btn btn-danger bg fixed-width-button"
//                     style={{ width: "150px" }}
//                     onClick={() => handleDelete(funko._id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

export default Cart;
