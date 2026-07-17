import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import { UserOutlined } from '@ant-design/icons';
import { Button, Avatar } from 'antd';

export const Nav = () => {
  return (
    <div className={styles.wrapper}>
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

      <div className={styles.UserWrapper}>
        <Button className={styles.replenishmentButton} type="primary">Replenishment</Button>
        <Avatar className={styles.Avatar} size={64} icon={<UserOutlined />} />
      </div>

      

    
    </div>

  );
};
