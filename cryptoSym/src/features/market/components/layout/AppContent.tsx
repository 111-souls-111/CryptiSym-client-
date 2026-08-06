import { Layout } from 'antd';
import { CoinSelector } from '../../components/chartsSection/CoinSelector';
import { PriceChart } from '../../components/chartsSection/PriceChart';
import { AppSider } from './AppSider';
import { TimeFramePanel } from '../../components/chartsSection/TimeFramePanel';
import styles from './AppContent.module.css';
import { Button } from 'antd/es/radio';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ProductChart } from '../chartsSection/ProductChart';
import { CoinInfo } from '../chartsSection/CoinInfo';
const { Content } = Layout;

export const AppContent = () => {
  const [activeSider, setActiveSider] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileOpen(false);
        setActiveSider(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSiderToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);

      setActiveSider(false);
    } else {
      setActiveSider(!activeSider);
    }
  };

  const handleCloseSider = () => {
    setMobileOpen(false);
    setActiveSider(false);
  };

  const hideContent = isMobile && mobileOpen;

  return (
    <>
      <Content className={`${styles.content} ${hideContent ? styles.hidden : ''}`}>
        <CoinSelector />
        <CoinInfo />
        <PriceChart />
        <ProductChart />
        <TimeFramePanel />
        <div className={styles.buttonWrapper}>
          <Button className={styles.buySellButton} onClick={handleSiderToggle}>
            {`${t('trade.buy')}/${t('trade.pay')}`}
          </Button>
        </div>
      </Content>
      <AppSider
        sider={!isMobile && activeSider}
        mobileOpen={isMobile && mobileOpen}
        onClose={handleCloseSider}
      />
    </>
  );
};
