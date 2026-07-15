import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import styles from './AppHeader.module.css';

export const AppHeader = () => {
  return (
    <Layout.Header className={styles.header}>
      <div className={styles.navWrapper}>
        <nav className={styles.nav}>
          <h3>CryptoSym</h3>
          <Link to="/" className={styles.navLink}>
            Store
          </Link>
          <Link to="/about" className={styles.navLink}>
            Portfolio
          </Link>
          <Link to="/products" className={styles.navLink}>
            Transaction
          </Link>
        </nav>
      </div>
    </Layout.Header>
  );
};
