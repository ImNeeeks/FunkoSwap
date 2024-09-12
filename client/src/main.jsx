import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Content/Login/Login.jsx";
import MyFunkoCollection from "./components/Content/MyFunkos/MyFunkoCollection/MyFunkoCollection.jsx";
import MyFunkoWishlist from "./components/Content/MyFunkos/MyFunkoWishlist/MyFunkoWishlist.jsx";
import MyFunkoSale from "./components/Content/MyFunkos/MyFunkoSale/MyFunkoSale.jsx";
import Search from "./components/Content/Search/Search.jsx";
// import OtherSales from "./components/Content/OtherFunkos/OtherSales/OtherSales.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";

//gives URL paths for each component
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // error: <NoMatch />, //make custom 404 page if you want
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/app/myCollection",
        element: (
          <ProtectedRoutes element={<MyFunkoCollection />}></ProtectedRoutes>
        ),
      },
      {
        path: "/app/myWishlist",
        element: (
          <ProtectedRoutes element={<MyFunkoWishlist />}></ProtectedRoutes>
        ),
      },
      {
        path: "/app/mySale",
        element: <ProtectedRoutes element={<MyFunkoSale />}></ProtectedRoutes>,
      },
      {
        path: "/app/Search",
        element: <ProtectedRoutes element={<Search />}></ProtectedRoutes>,
      },
      // {
      //   path: "/app/otherSales",
      //   element: <ProtectedRoutes element={<OtherSales />}></ProtectedRoutes>,
      // },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
