import { Navigate, Outlet } from 'react-router-dom';
import { checkRoles } from '../utils/Authen';

const RequireAuth = ({ allowedRole }) => {
  const checkRole = checkRoles(allowedRole);
  const content = checkRole ? <Outlet /> : <Navigate to="/login" />;
  return content;
};

export default RequireAuth;
