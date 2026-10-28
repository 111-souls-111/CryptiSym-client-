import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import type { TradeRequest,TradeResponse, PortfolioState } from '../types';
import api from '../../../services/api';


const initialState: PortfolioState = {
  balance: 10000.0,
  items: {},
  loading: false,
  error: null,
};

export const executeTrade = createAsyncThunk<
  TradeResponse['data'],
  TradeRequest,
  { rejectValue: string }
>('portfolio/executeTrade', async (tradeData, { rejectWithValue }) => {
  try {
    const response = await api.post<TradeResponse>('/api/v1/trade', tradeData);
    return response.data.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Transaction failed');
  }
});

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(executeTrade.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(executeTrade.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.current_balance;

        const updated = action.payload.updated_portfolio;
        if (updated.quantity === 0) {
          delete state.items[updated.coin_id]; // Если продали в ноль, удаляем из портфеля
        } else {
          state.items[updated.coin_id] = updated;
        }
      })
      .addCase(executeTrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export default portfolioSlice.reducer;
