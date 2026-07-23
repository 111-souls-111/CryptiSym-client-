import { Layout } from 'antd';
import { CoinSelector } from '../CoinSelector';
import { PriceChart } from '../PriceChart';
import { AppSider } from './AppSider';
import { TimeFramePanel } from '../TimeFramePanel';
import styles from './AppContent.module.css';

const { Content } = Layout;
export const AppContent = () => {
  return (
    <>
      <Content className={styles.content}>
        <CoinSelector />
        <PriceChart />
        <TimeFramePanel />
      </Content>
      <AppSider />
    </>
  );
};
