// features/Auth/LoginPage.tsx
import { useAuth } from '../../hooks/useAuth';
import { Button, Card, Typography, Spin} from 'antd';
import { Navigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const { Title, Text } = Typography;

export const LoginPage = () => {
  const { login, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
    return (
      <div className={styles.spinContainer}>
        <Spin className={styles.spin} size="large" tip="загрузка..." />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.loginCard}>
        
          <div className={styles.logo}>
            <Title level={2}>CryptoSym</Title>
            <Text type="secondary">Войдите в свой аккаунт</Text>
          </div>

          <Button
            className={styles.loginButton}
            block
            onClick={() => login()}
          >
            Войти
          </Button>
          <div style={{ textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: 15 }}>
                вы будете перенаправлены на страницу регистрации Zitadel
            </Text>
          </div>
      </Card>
    </div>
  );
};