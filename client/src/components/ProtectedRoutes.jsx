import React from "react";

import { Navigate, Outlet } from "react-router-dom";

// protected routes are accessible only when token from localStorage is present after logging in
const ProtectedRoutes = ({ element }) => {
  const localStorageToken = localStorage.getItem("token");

  // otherwise, the user is redirected to the login to obtain token
  return localStorageToken ? element : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
