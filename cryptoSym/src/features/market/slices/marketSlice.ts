import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ChartPoint {
  time: string;
  price: number;
}

interface CoinsInfo{
  id: string;
  name: string;
}

interface VolumePoint {
  time: string;
  volume: number;
}

interface MarketState {
  coinsList: CoinsInfo[];
  selectedCoinId: string;   
  currentPrice: number;     
  change24hPercent: number; 
  priceHistory: ChartPoint[];  
  volumeHistory: VolumePoint[]; 
}

const initialState: MarketState = {
  coinsList: [
    { id: 'bitcoin', name: 'Bitcoin (BTC)' },
    { id: 'ethereum', name: 'Ethereum (ETH)' },
    { id: 'solana', name: 'Solana (SOL)' },
  ],
  selectedCoinId: 'bitcoin', 
  currentPrice: 897.40,
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

    setCoinList(state,action: PayloadAction<CoinsInfo[]>){
      state.coinsList = action.payload;
    },

    updateCurrentMarketData(state, action: PayloadAction<{ 
      current_price: number; 
      change_24h_percent: number;
      charts: { price_line: ChartPoint[]; volume_bar: VolumePoint[] }
    }>) {
      state.currentPrice = action.payload.current_price;
      state.change24hPercent = action.payload.change_24h_percent;
      state.priceHistory = action.payload.charts.price_line;
      state.volumeHistory = action.payload.charts.volume_bar;
    },
  },
});

export const { changeSelectedCoin, updateCurrentMarketData } = marketSlice.actions;
export default marketSlice.reducer;