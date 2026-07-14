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
import styles from "./PriceChart.module.css"

export const PriceChart: React.FC = () => {
  const priceHistory = useSelector((state: RootState) => state.market.priceHistory);
  //   const selectedCoinId = useSelector((state: RootState) => state.market.selectedCoinId);
  const currentPrice = useSelector((state: RootState) => state.market.currentPrice);

  return (
    <div>
      <div className={styles.chartsTitle}>
        <span>{currentPrice}</span>
      </div>

      <div className = {styles.chartContainer} style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={priceHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fa8c16" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#fa8c16" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#666" fontSize={12} />
            <YAxis
              domain={['dataMin - 5', 'dataMax + 5']}
              stroke="#666"
              fontSize={12}
              tickFormatter={value => `$${value.toFixed(0)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#262626',
                borderColor: '#434343',
                color: '#fff',
                height: '50px',
              }}
              formatter={(value: any) => [`$${value.toFixed(2)}`, 'Цена']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#fa8c16"
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
