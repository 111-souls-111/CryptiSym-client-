// components/Auth/ProtectedRoute.tsx
import { useAuth } from '../../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { type ProtectedRouteProps } from '../types';
import LoadingSpin from './LoadingSpin';


export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const {t} = useTranslation()

  if (isLoading) {
    return (
      <LoadingSpin t={t}/>
      
    );
  }

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return <>{children}</>;
};