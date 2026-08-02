import React from 'react';
import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell
} from 'recharts';
import { type RootState } from '../../../../app/store';
import styles from './CombinedChart.module.css';
import { useTranslation } from 'react-i18next';

interface ChartData {
  time: string;
  price: number;
  volume: number;
}

export const CombinedChart: React.FC = () => {
  const priceHistory = useSelector((state: RootState) => state.market.priceHistory);
  const volumeHistory = useSelector((state: RootState) => state.market.volumeHistory);
  const currentPrice = useSelector((state: RootState) => state.market.currentPrice);
  const { t } = useTranslation();

  // Объединяем данные
  const combinedData: ChartData[] = React.useMemo(() => {
    if (!priceHistory || !volumeHistory || priceHistory.length === 0) return [];

    return priceHistory.map((item: any, index: number) => ({
      time: item.time,
      price: item.price || 0,
      volume: volumeHistory[index]?.volume || 0,
    }));
  }, [priceHistory, volumeHistory]);

  if (!combinedData || combinedData.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📊</div>
          <div className={styles.emptyTitle}>
            {t('chart.noData') || 'Нет данных для отображения'}
          </div>
          <div className={styles.emptyDescription}>
            {t('chart.waitingForData') || 'Данные появятся после начала торгов'}
          </div>
        </div>
      </div>
    );
  }

  // Текущая цена и изменение
  const lastPrice = combinedData[combinedData.length - 1]?.price || 0;
  const firstPrice = combinedData[0]?.price || 0;
  const isUp = lastPrice >= firstPrice;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercent = (priceChange / firstPrice) * 100;

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartsHeader}>
        <div className={styles.priceInfo}>
          <span className={styles.priceLabel}>
            {t('chart.price') || 'Цена'}
          </span>
          <div className={styles.priceRow}>
            <span className={styles.priceValue}>
              ${(currentPrice || lastPrice).toFixed(2)}
            </span>
            <span className={`${styles.priceChange} ${isUp ? styles.up : styles.down}`}>
              {isUp ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        <div className={styles.volumeInfo}>
          <span className={styles.volumeLabel}>
            {t('chart.volume') || 'Объем'}
          </span>
          <span className={styles.volumeValue}>
            ${combinedData.reduce((sum, item) => sum + item.volume, 0).toLocaleString()}
          </span>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={combinedData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isUp ? '#26a69a' : '#ef5350'} stopOpacity={0.7} />
                <stop offset="95%" stopColor={isUp ? '#26a69a' : '#ef5350'} stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="var(--border-color)" 
              vertical={false}
            />

            <XAxis 
              dataKey="time" 
              stroke="var(--border-color)" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: 'var(--border-color)' }}
              interval="preserveStartEnd"
              minTickGap={50}
            />

            {/* Левая ось для цены */}
            <YAxis
              yAxisId="price"
              orientation="left"
              domain={['dataMin - 5', 'dataMax + 5']}
              stroke="var(--primary-color)"
              fontSize={12}
              tickFormatter={value => `$${value.toFixed(0)}`}
              tickLine={false}
              axisLine={{ stroke: 'var(--border-color)' }}
            />

            {/* Правая ось для объема */}
            <YAxis
              yAxisId="volume"
              orientation="right"
              domain={[0, 'dataMax + 10']}
              stroke="var(--volume-color, #8884d8)"
              fontSize={12}
              tickFormatter={value => value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toFixed(0)}
              tickLine={false}
              axisLine={{ stroke: 'var(--border-color)' }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--header-color)',
                borderColor: 'var(--border-color)',
                color: 'var(--white-color)',
                borderRadius: '8px',
                padding: '12px',
                minWidth: '180px',
              }}
              formatter={(value: any, name: any) => {
                if (name === 'price') {
                  return [`$${value.toFixed(2)}`, t('chart.price')];
                }
                if (name === 'volume') {
                  return [`$${value.toLocaleString()}`, t('chart.volume')];
                }
                return [value, name];
              }}
              labelFormatter={(label) => `${t('chart.time')}: ${label}`}
            />

            <Legend 
              verticalAlign="top"
              height={36}
              iconType="square"
              formatter={(value) => {
                if (value === 'price') return t('chart.price') || 'Цена';
                if (value === 'volume') return t('chart.volume') || 'Объем';
                return value;
              }}
            />

            {/* График цены (линия) */}
            <Area
              yAxisId="price"
              type="monotone"
              dataKey="price"
              stroke="var(--primary-color)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
              dot={false}
              activeDot={{ r: 6 }}
              name="price"
            />

            {/* Столбцы объема */}
            <Bar
              yAxisId="volume"
              dataKey="volume"
              fill="url(#colorVolume)"
              opacity={0.6}
              barSize={5}
              name="volume"
              
            >
              {combinedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={entry.price >= (combinedData[index - 1]?.price || entry.price) ? '#26a69a' : '#ef5350'}
                  opacity={0.5}
                />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};