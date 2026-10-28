import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';
import type {
  TradeRequest,
  TradeResponse,
  PortfolioState,
  PortfolioItem,
  Transaction,
} from '../types';

const initialState: PortfolioState = {
  balance: 0,
  items: {},
  transactions: [],
  loading: false,
  transactionsLoading: false,
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

export const fetchPortfolio = createAsyncThunk<
  { balance: number; items: Record<string, PortfolioItem> },
  void,
  { rejectValue: string }
>('portfolio/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/api/v1/auth/portfolio');
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to load portfolio');
  }
});

export const fetchTransactions = createAsyncThunk<
  Transaction[],
  { limit?: number; offset?: number; coin_id?: string; type?: 'BUY' | 'SELL' } | void,
  { rejectValue: string }
>('portfolio/fetchTransactions', async (params, { rejectWithValue }) => {
  try {
    const res = await api.get('/api/v1/transactions', {
      params: params || {},
    });
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to load transactions');
  }
});

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // executeTrade
      .addCase(executeTrade.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(executeTrade.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.current_balance;

        const updated = action.payload.updated_portfolio;
        if (updated.quantity === 0) {
          delete state.items[updated.coin_id];
        } else {
          state.items[updated.coin_id] = updated;
        }
      })
      .addCase(executeTrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      })

      // fetchPortfolio
      .addCase(fetchPortfolio.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.balance;
        state.items = action.payload.items || {};
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load portfolio';
      })

      // fetchTransactions
      .addCase(fetchTransactions.pending, state => {
        state.transactionsLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactionsLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, state => {
        state.transactionsLoading = false;
      });
  },
});

export default portfolioSlice.reducer;