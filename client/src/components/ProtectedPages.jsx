import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const ProtectedPages = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    // Show a loading indicator while the authentication status is being determined
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isSignedIn ? <Outlet /> : <Navigate to="/signin" />}
    </div>
  );
};

export default ProtectedPages;