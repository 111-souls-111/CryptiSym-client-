import { type CoinsInfo } from './coins';
import { type ChartPoint } from './charts';
import { type VolumePoint } from './charts';

export type TimeFrame = '24h' | '1h' | '7d' | '30d' | '1y';

export interface MarketState {
  selectedTimeFrame: TimeFrame;
  coinsList: CoinsInfo[];
  selectedCoinId: string;
  currentPrice: number;
  change24hPercent: number;
  priceHistory: ChartPoint[];
  volumeHistory: VolumePoint[];
}
