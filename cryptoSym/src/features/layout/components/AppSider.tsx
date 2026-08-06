import { Layout } from 'antd';
import styles from './AppSider.module.css';
import { BuySellPanel } from '../../market/components/BaySellPanel/BuySellPanel';

interface ComponentProps {
  sider?: boolean;
  mobileOpen?: boolean;
  onClose?: () => void;
}

export const AppSider = ({ sider, mobileOpen, onClose }: ComponentProps) => {
  const getClassName = () => {
    if (mobileOpen) {
      return `${styles.sider} ${styles.mobileOpen}`;
    }
    if (sider) {
      return styles.sider;
    }
    return styles.siderHidden;
  };

  return (
    <Layout.Sider width="400px" className={getClassName()}>
      {mobileOpen && (
        <button onClick={onClose} className={styles.closeButton}>
          ✕
        </button>
      )}
      <BuySellPanel />
    </Layout.Sider>
  );
};
