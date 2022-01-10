import React, {useContext} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {Context} from './Context';

// PrivateRoute wrapper to restrict access to protected pages
const PrivateRoute = ({ children }) => {
  const context = useContext(Context);
  const location = useLocation();
  return context.authenticatedUser ? children : <Navigate to="/signin" state={{from : location}} />;
};

export default PrivateRoute;