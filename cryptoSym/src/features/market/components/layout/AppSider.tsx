import { Layout } from 'antd';
import styles from './AppSider.module.css';
import { BuySellPanel } from '../BaySellPanel/BuySellPanel';

export const AppSider = () => {
  return (
    <Layout.Sider width="25%" className={styles.sider}>
      <BuySellPanel />
    </Layout.Sider>
  );
};
