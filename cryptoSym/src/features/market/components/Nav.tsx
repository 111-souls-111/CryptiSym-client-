import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

export const Nav = () => {
  return (
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
  );
};
