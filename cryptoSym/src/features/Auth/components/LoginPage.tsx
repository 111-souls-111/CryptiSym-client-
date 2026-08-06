// features/Auth/LoginPage.tsx
import { useAuth } from '../../../hooks/useAuth';
import { Button, Card, Typography, Spin} from 'antd';
import { Navigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { useTranslation } from 'react-i18next';
import LoadingSpin from './LoadingSpin';

const { Title, Text } = Typography;


export const LoginPage = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const  {t}  = useTranslation()

    if (isLoading) {
    return (
      <LoadingSpin t={t}/>
    
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
            <Text type="secondary">{t("auth.loginInfo")}</Text>
          </div>

          <Button
            className={styles.loginButton}
            block
            onClick={() => login()}
          >
            {t('auth.login')}
          </Button>
          <div style={{ textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: 15 }}>
                {t("auth.info")}
            </Text>
          </div>
      </Card>
    </div>
  );
};