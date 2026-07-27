import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import { UserOutlined } from '@ant-design/icons';
import { Button, Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
import 'flag-icons/css/flag-icons.min.css';
import { LangSelector } from './LangSelector';

export const Nav = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <h3>CryptoSym</h3>
        <Link to="/" className={styles.navLink}>
          {t('nav.store')}
        </Link>
        <Link to="/about" className={styles.navLink}>
          {t('nav.portfolio')}
        </Link>
        <Link to="/products" className={styles.navLink}>
          {t('nav.transaction')}
        </Link>
      </nav>

      <div className={styles.UserWrapper}>
        <LangSelector />

        <Button className={styles.replenishmentButton} type="primary">
          {t('nav.replenishment')}
        </Button>
        <Avatar className={styles.Avatar} size={64} icon={<UserOutlined />} />
      </div>
    </div>
  );
};
