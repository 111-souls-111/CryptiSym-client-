// types/charts.ts
export interface ChartPoint {
  time: string;
  price: number;
}

export interface VolumePoint {
  time: string;
  volume: number;
}
export type TimeFrame = '24h' | '1h' | '7d' | '30d' | '1y';
