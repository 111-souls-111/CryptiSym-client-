import { type CoinsInfo } from './coins';
import { type ChartPoint } from './charts';
import { type VolumePoint } from './charts';

export type TimeFrame = '1D' | '1W' | '1M';

export interface MarketState {
  selectedTimeFrame: TimeFrame;
  coinsList: CoinsInfo[];
  selectedCoinId: string;
  currentPrice: number;
  change24hPercent: number;
  priceHistory: ChartPoint[];
  volumeHistory: VolumePoint[];
}
