import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import type { UserRole } from '@/types/auth.types';

interface RoleProtectedRouteProps {
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

const RoleProtectedRoute = ({
  allowedRoles,
  redirectTo = '/login',
}: RoleProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;