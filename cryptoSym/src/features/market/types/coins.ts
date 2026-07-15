import { type ChartPoint } from './charts';
import { type VolumePoint } from './charts';
export interface CoinsInfo {
  id: string;
  name: string;
}

export interface DataCoins {
  coin_id: string;
  current_price: number;
  change_24h_percent: number;
  charts: {
    price_line: ChartPoint[];
    volume_bar: VolumePoint[];
  };
}


export interface currentCoins {
  coin_id: string;
  time_range?:string;
  charts: {
    price_line: ChartPoint[];
    volume_bar: VolumePoint[];
  };
}

export interface SelectedCoin {
  value: string;
  label: React.ReactNode;
}
