import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles, children }) => {
  const userRole = localStorage.getItem('userRole') || 'GUEST';
  return allowedRoles.includes(userRole) ? children : <Navigate to="/login" />;
};

export default PrivateRoute;