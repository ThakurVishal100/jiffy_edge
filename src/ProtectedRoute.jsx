import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const roleId = localStorage.getItem("roleId");
  const userId = localStorage.getItem("userId");

  if (!token || !roleId || !userId) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
