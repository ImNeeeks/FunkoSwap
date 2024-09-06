import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Content/Login/Login.jsx";
import Logout from "./components/Content/Logout/Logout.jsx";
import MyFunkoCollection from "./components/Content/MyFunkos/MyFunkoCollection/MyFunkoCollection.jsx";
import MyFunkoWishlist from "./components/Content/MyFunkos/MyFunkoWishlist/MyFunkoWishlist.jsx";
import MyFunkoSale from "./components/Content/MyFunkos/MyFunkoSale/MyFunkoSale.jsx";
import OtherCollections from "./components/Content/OtherFunkos/OtherCollections/OtherCollections.jsx";
import OtherSales from "./components/Content/OtherFunkos/OtherSales/OtherSales.jsx";

//gives URL paths for each component
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // error: <NoMatch />, //make custom 404 page if you want
    children: [
      {
        index: true,
        element: <Login />, // NEED to create logic to switch Login to Logout depending on state
      },
      {
        path: "/myFunkoCollection",
        element: <MyFunkoCollection />,
      },
      {
        path: "/myFunkoWishlist",
        element: <MyFunkoWishlist />,
      },
      {
        path: "/myFunkoSale",
        element: <MyFunkoSale />,
      },
      {
        path: "/otherCollections",
        element: <OtherCollections />,
      },
      {
        path: "/otherSales",
        element: <OtherSales />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
