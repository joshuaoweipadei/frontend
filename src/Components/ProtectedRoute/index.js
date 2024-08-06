import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { accountServices } from '../../_services';

// const ProtectedRoute = ({ element: Component, ...rest }) => {
//   const account = accountServices.accountValue;
//   return account ? <Component {...rest} /> : <Navigate to="/login" />;
// };

function ProtectedRoute({ children }) {
  const account = accountServices.accountValue;
  console.log(account)
  
  if(!account){
    return <Navigate to="/login" />  // not logged in so redirect to login page with the return url state={{ from: history.location }}
  }
  return children ? children : <Outlet />
}

export default ProtectedRoute;