import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TimeFrame = '1D' | '1W' | '1M';

interface ChartPoint {
  time: string;
  price: number;
}

interface CoinsInfo {
  id: string;
  name: string;
}

interface VolumePoint {
  time: string;
  volume: number;
}

export interface DataCoins {
  coin_id: string;
  current_price: number;
  change_24h_percent: number;
  charts: { price_line: ChartPoint[]; volume_bar: VolumePoint[] };
}

interface MarketState {
  selectedTimeFrame: TimeFrame;
  coinsList: CoinsInfo[];
  selectedCoinId: string;
  currentPrice: number;
  change24hPercent: number;
  priceHistory: ChartPoint[];
  volumeHistory: VolumePoint[];
}

const initialState: MarketState = {
  selectedTimeFrame: '1D',
  coinsList: [],
  selectedCoinId: 'bitcoin',
  currentPrice: 897.4,
  change24hPercent: 52.28,
  priceHistory: [],
  volumeHistory: [],
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    changeSelectedCoin(state, action: PayloadAction<string>) {
      state.selectedCoinId = action.payload;
      state.priceHistory = [];
      state.volumeHistory = [];
    },

    setCoinList(state, action: PayloadAction<CoinsInfo[]>) {
      state.coinsList = action.payload;
    },

    changeTimeFrame(state, action: PayloadAction<TimeFrame>) {
      state.selectedTimeFrame = action.payload;
    },

    updateCurrentMarketData(state, action: PayloadAction<DataCoins[]>) {
      const serverDataArray = action.payload;
      const ListCoins: CoinsInfo[] = serverDataArray.map(item => ({
        id: item.coin_id,
        name: item.coin_id,
      }));

      if (!Array.isArray(serverDataArray)) return;

      const activeCoinData = serverDataArray.find(coin => coin.coin_id === state.selectedCoinId);

      if (activeCoinData) {
        state.coinsList = ListCoins;
        state.currentPrice = activeCoinData.current_price;
        state.change24hPercent = activeCoinData.change_24h_percent;
        state.priceHistory = activeCoinData.charts?.price_line || [];
        state.volumeHistory = activeCoinData.charts?.volume_bar || [];
      }
    },
  },
});

export const { changeSelectedCoin, updateCurrentMarketData, changeTimeFrame } = marketSlice.actions;
export default marketSlice.reducer;
