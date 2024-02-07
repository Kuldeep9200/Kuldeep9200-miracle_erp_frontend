// ProtectedRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authToken } = useAuth();

  return (
    <Route
      {...rest}
      element={
        authToken ? (
          <Component />
        ) : (
          <Navigate to="/login" replace={true} /> // Redirect to the login page if not authenticated
        )
      }
    />
  );
};

export default ProtectedRoute;
