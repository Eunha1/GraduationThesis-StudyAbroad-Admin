import { jwtDecode } from 'jwt-decode';

function useAuth(allowedRole) {
  const token = localStorage.getItem('access_token');
  if (token) {
    const decode = jwtDecode(token);
    const role = decode.role;

    if (allowedRole.includes(role)) {
      return true;
    }
    return false;
  }
  return false;
}

export default useAuth;
