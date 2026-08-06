import React from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../../../app/store';
import styles from './CoinInfo.module.css';
import { useTranslation } from 'react-i18next';

export const CoinInfo: React.FC = () => {
  const priceHistory = useSelector((state: RootState) => state.market.priceHistory);
  const volumeHistory = useSelector((state: RootState) => state.market.volumeHistory);
  const currentPrice = useSelector((state: RootState) => state.market.currentPrice);
  const { t } = useTranslation();

  const lastPrice = priceHistory[priceHistory.length - 1]?.price || 0;
  const firstPrice = priceHistory[0]?.price || 0;
  const isUp = lastPrice >= firstPrice;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercent = (priceChange / firstPrice) * 100;
  if (!priceHistory || priceHistory.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.chartsHeader}>
      <div className={styles.priceInfo}>
        <span className={styles.priceLabel}>{`${t('chart.price')}:`}</span>
        <div className={styles.priceRow}>
          <span className={styles.priceValue}>${(currentPrice || lastPrice).toFixed(2)}</span>
          <span className={`${styles.priceChange} ${isUp ? styles.up : styles.down}`}>
            {isUp ? '+' : ''}
            {priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
          </span>
        </div>
      </div>
      <div className={styles.volumeInfo}>
        <span className={styles.volumeLabel}>{t('chart.volume')}</span>
        <span className={styles.volumeValue}>
          ${volumeHistory.reduce((sum, item) => sum + item.volume, 0).toLocaleString()}
        </span>
      </div>
    </div>
  );
};
