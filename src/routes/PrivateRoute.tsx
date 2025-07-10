import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, roles }: { children: JSX.Element, roles?: string[] }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && user) {
    const userRole = user.role.toLowerCase();
    const hasAccess = roles.some(role => role.toLowerCase() === userRole);
    
    if (!hasAccess) {
      // Redirect to role-specific default route
      if (userRole === 'Doctor') return <Navigate to="/dashboard" replace />;
      if (userRole === 'admin') return <Navigate to="/admin" replace />;
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default PrivateRoute;