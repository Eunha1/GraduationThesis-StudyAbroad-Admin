import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hook/useAuth';

const RequireAuth = ({ allowedRole }) => {
  const checkRole = useAuth(allowedRole);
  const content = checkRole ? <Outlet /> : <Navigate to="/login" />;
  return content;
};

export default RequireAuth;
