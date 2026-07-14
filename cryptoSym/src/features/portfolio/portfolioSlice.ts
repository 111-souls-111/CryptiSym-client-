import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PortfolioState {
  balanceUSDC: number; 
  assets: {
    [coinId: string]: number;
  };
}

const initialState: PortfolioState = {
  balanceUSDC: 10000,
  assets: {}
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {

    setPortfolioData(state, action: PayloadAction<{ balanceUSDC: number; assets: { [coinId: string]: number } }>) {
      state.balanceUSDC = action.payload.balanceUSDC;
      state.assets = action.payload.assets;
    },
  },
});

export const { setPortfolioData } = portfolioSlice.actions;
export default portfolioSlice.reducer;