import React from "react";
import authService from './Content/utils/auth';
import { Navigate, Outlet } from "react-router-dom";

// protected routes are accessible only when token from localStorage is present after logging in
const ProtectedRoutes = ({ element }) => {
  const localStorageToken = authService.getToken()
  const isExpired = authService.isTokenExpired(localStorageToken);

  // otherwise, the user is redirected to the login to obtain token
  return localStorageToken || !isExpired ? element : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
