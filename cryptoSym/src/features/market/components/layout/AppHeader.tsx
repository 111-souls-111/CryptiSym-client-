import { Layout } from 'antd';
import styles from './AppHeader.module.css';

import { Nav } from '../Nav';

export const AppHeader = () => {
  return (
    <Layout.Header className={styles.header}>
      <div className={styles.navWrapper}>
        <Nav />
      </div>
    </Layout.Header>
  );
};
