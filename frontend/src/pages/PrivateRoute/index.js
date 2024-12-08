import React from "react";
import { useSelector } from 'react-redux';

import { Outlet, Navigate } from "react-router";

const PrivateRoute = () => {
  const { loading, userData } = useSelector((state) => state.auth);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    userData && userData.is_superuser
      ? <Outlet />
      : <Navigate to='/login' replace />
  );
}

export default PrivateRoute;