import React from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { type RootState } from '../../../../app/store';
import styles from './ProductChart.module.css';
import { useTranslation } from 'react-i18next';

export const ProductChart: React.FC = () => {
  const volumeHistory = useSelector((state: RootState) => state.market.volumeHistory);
  const { t } = useTranslation();

  if (!volumeHistory || volumeHistory.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <div className={styles.emptyState}>
          <div className={styles.emptyTitle}>{t('common.noData')}</div>
          <div className={styles.emptyDescription}>{t('common.waitingForData')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={volumeHistory} margin={{ top: 20, right: 30, left: 0, bottom: 25 }}>
          <defs>
            <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />

          <XAxis
            dataKey="time"
            stroke="var(--border-color)"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: 'var(--border-color)' }}
          />

          <YAxis
            domain={['dataMin - 5', 'dataMax + 5']}
            stroke="var(--border-color)"
            fontSize={12}
            tickFormatter={value => `$${value.toFixed(0)}`}
            tickLine={false}
            axisLine={{ stroke: 'var(--border-color)' }}
            orientation="right"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--header-color)',
              borderColor: 'var(--border-color)',
              color: 'var(--white-color)',
              borderRadius: '8px',
              padding: '12px',
            }}
            formatter={(value: any) => [`$${value.toFixed(2)}`, t('chart.volume')]}
            labelFormatter={label => `${label}`}
          />

          <Bar
            dataKey="volume"
            fill="url(#colorVolume)"
            stroke="var(--primary-color)"
            strokeWidth={1}
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
