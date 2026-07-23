import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Контракт на отправку (TradeRequest)
interface TradeRequest {
  coin_id: string;
  type: string;
  quantity: number;
}

interface PortfolioItem {
  coin_id: string;
  quantity: number;
  avg_buy_price: number;
}

interface TradeResponse {
  success: boolean;
  message: string;
  data: {
    current_balance: number;
    updated_portfolio: PortfolioItem;
  };
}

interface PortfolioState {
  balance: number;
  items: Record<string, PortfolioItem>;
  loading: boolean;
  error: string | null;
}

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
    const response = await axios.post<TradeResponse>('/api/v1/trade', tradeData);
    return response.data.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Transaction failed');
  }
});

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    // Сюда можно добавить экшен инициализации портфеля при загрузке страницы
  },
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
