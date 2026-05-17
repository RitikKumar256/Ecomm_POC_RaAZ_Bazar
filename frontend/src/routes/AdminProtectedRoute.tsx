import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }: any) => {
  const token = localStorage.getItem("admin_jwt");
  const role = localStorage.getItem("role");

  if (!token || role !== "ROLE_ADMIN") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;