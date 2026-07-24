import React from 'react';
import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { type RootState } from '../../../app/store';
import styles from './PriceChart.module.css';
import { useTranslation } from 'react-i18next';

export const PriceChart: React.FC = () => {
  const priceHistory = useSelector((state: RootState) => state.market.priceHistory);
  //   const selectedCoinId = useSelector((state: RootState) => state.market.selectedCoinId);
  const currentPrice = useSelector((state: RootState) => state.market.currentPrice);
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.chartsTitle}>
        <span>{currentPrice} $</span>
      </div>

      <div style={{ width: '100%', height: 450 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={priceHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor=" var(--primary-color) " stopOpacity={0.3} />
                <stop offset="95%" stopColor=" var(--primary-color) " stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var( --border-color) " />
            <XAxis dataKey="time" stroke="var(--border-color)" fontSize={12} />
            <YAxis
              domain={['dataMin - 5', 'dataMax + 5']}
              stroke="#666"
              fontSize={12}
              tickFormatter={value => `$${value.toFixed(0)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: ' var(--header-color) ',
                borderColor: ' var(--border-color)',
                color: 'var(--white-color) ',
                height: '50px',
              }}
              formatter={(value: any) => [`$${value.toFixed(2)}, $${t('chart.price')}`]}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke=" var(--primary-color) "
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
