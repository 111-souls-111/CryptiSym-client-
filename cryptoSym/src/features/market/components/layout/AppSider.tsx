import { Layout } from 'antd';
import styles from './AppSider.module.css';
import { BuySellPanel } from '../BuySellPanel';

export const AppSider = () => {
  return (
    <Layout.Sider width="25%" className={styles.sider} style={{ background: '#000000' }}>
      <BuySellPanel />
    </Layout.Sider>
  );
};
