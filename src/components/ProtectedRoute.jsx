import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <Navigate to="/auth/login" replace="true" state={{ from: location }} />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
