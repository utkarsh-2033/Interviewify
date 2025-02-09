import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const ProtectedPages = () => {
  const { isSignedIn } = useUser();

  return (
    <div>
      {isSignedIn ? <Outlet /> : <Navigate to="/signin" />}
    </div>
  );
};

export default ProtectedPages;