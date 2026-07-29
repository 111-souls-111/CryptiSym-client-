import { Layout } from 'antd';
import { CoinSelector } from '../../components/chartsSection/CoinSelector';
import { PriceChart } from '../../components/chartsSection/PriceChart';
import { AppSider } from './AppSider';
import { TimeFramePanel } from '../../components/chartsSection/TimeFramePanel';
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
