import { Navigate, Outlet } from 'react-router-dom';
import { firebaseAuth } from '../api/firebase/firebase';
import { routes } from '../static/routes';

export const ProtectedRoute = () => {
  if (!firebaseAuth.currentUser) {
    return <Navigate to={routes.login} replace />;
  }
  return <Outlet />;
};
