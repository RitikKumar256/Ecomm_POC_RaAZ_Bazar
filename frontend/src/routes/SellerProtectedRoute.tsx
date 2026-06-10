import React from "react";
import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ children }: any) => {

  const token = localStorage.getItem("seller_jwt");
  const role = localStorage.getItem("role");

  if (!token || role !== "ROLE_SELLER") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SellerProtectedRoute;