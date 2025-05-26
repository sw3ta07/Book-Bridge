import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to sign in page and remember where they were trying to go
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected route
  return <Outlet />;
};

export default ProtectedRoute;