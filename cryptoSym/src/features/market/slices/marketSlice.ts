import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { 
  MarketState,
  TimeFrame, 
  CoinsInfo, 
  DataCoins,
} from '../types';


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
