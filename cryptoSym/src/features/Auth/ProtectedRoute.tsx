// components/Auth/ProtectedRoute.tsx
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import styles from "./ProtectedRoute.module.css"
import { Spin } from 'antd';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={styles.spinContainer}>
        <Spin className={styles.spin}  size="large" tip="Загрузка..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};