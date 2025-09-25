// src/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../GlobalContext/UserContext';

const Protected = ({ children, allowed }) => {
  const { loading , User} = useContext(UserContext);
  console.log("User Protected" , User);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!User?.status) return <Navigate to="/Login" />;

  if (!allowed.includes(User?.status)) return <Navigate to="/Login" />;

  return children;
};

export default Protected;
